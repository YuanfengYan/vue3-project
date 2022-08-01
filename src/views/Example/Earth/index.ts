

// import { Cesium } from 'Cesium'
import { defineComponent } from 'vue';
import { getPoivs,getPoivPath } from '@/api/earth';
import CesiumSdk from "@/utils/CesiumSdk"
import utils from "@/utils/index"
const SETTING = {
  //相机最大高度 单位米
  MAXIMUMZOOMDISTANCE: 22657211,
  //相机最小 单位米
  MINIMUMZOOMDISTANCE: 82,
  //普通气球点图片
  POINTNORMAL: 'https://aharesource-bucket.ahaschool.com.cn/earth/2021/07/22/60f950997e0b5kd3scbyXTV_w_130_h_194.png',
  //聚合图标
  POINTCOLLECT: "https://aharesource-bucket.ahaschool.com.cn/earth/2021/08/04/610a36d935c52cYQaUA4zYA_w_44_h_56.png",
}
const SimulationDate =  '2021-12-25' //第一个点启动的模拟事件
const clocktime = 50 //两点之间动画时长 t/10


interface point{
  longitude: number,
  latitude: number,
  height?: number,
}
let CurrentLevel: number = 1
let DataSource: Cesium.GeoJsonDataSource
const PathEntityIds:string|undefined[] = []
// let trackedEntity: any
export default defineComponent({
  data() {
    return {
      hasPoivs: false,//显示poiv点
      hasPath: false,//显示路线
      showPathConf: false,//显示生成路线的配置
      // 生成路线的form配置参数
      pathForm: {
        count: 2,
        radians: 30,
      },
      pathLen : 1,//线路条数
      pathcurIndex: 0,//当前走到的位置
      // 家的位置
      homeLocation: {
        longitude: 120.886,
        latitude: 29.5198,
        height: 10000,
      },
      mapStyle:'Aerial',
      mapstyleList:["Aerial","AerialWithLabels","AerialWithLabelsOnDemand","CanvasDark","CanvasGray","CanvasLight","CollinsBart","OrdnanceSurvey","Road","RoadOnDemand"]

    }
  },
  methods: {
    /**
     * 地球加载完成回调
     * @param param0 
     */
    ready({ Cesium, viewer }: any) {
      window['cesium'] = Cesium
      window['viewer'] = viewer

      //缓存的瓦片数，数值越小占用内存越小，但再次使用时会重新请求，默认100
      // window['cesium'].Globe.tileCacheSize = 10;
      //获取或设置被视为“太多”的加载子体分幅数。如果一个磁贴有太多的加载子体，则该磁贴将在加载和渲染其任何子体之前加载和渲染。这意味着用户可以得到更多的反馈，即某些事情正在以更长的总体加载时间为代价发生。将此设置为0将导致依次加载每个磁贴级别，从而显著增加加载时间。将其设置为较大的数字（例如1000）将最大限度地减少加载的磁贴数量，但往往会在长时间等待后立即显示所有细节。默认20
      //  window['cesium'].Globe.loadingDescendantLimit = 30;
      window['viewer'].scene.screenSpaceCameraController.maximumZoomDistance = SETTING.MAXIMUMZOOMDISTANCE;
      window['viewer'].scene.screenSpaceCameraController.minimumZoomDistance = SETTING.MINIMUMZOOMDISTANCE;
      this.showWtfs()//加载地名服务
      //  window['viewer'].scene.screenSpaceCameraController.enableTilt = false;
      //  window['viewer'].scene.screenSpaceCameraController.inertiaSpin = 0.9;
      // window['viewer'].scene.screenSpaceCameraController.inertiaTranslate = 0.9;
      // window['viewer'].scene.screenSpaceCameraController.inertiaZoom = 0.9;
      // window['viewer'].scene.screenSpaceCameraController._zoomFactor = 5;
      // this.bindPoivs()
      // this.cumputePosition()
      // this.initBindPath()

    },
    /**
     * 接口请求拿到数据点=》绑定poiv到地球上（并设置聚合规则）
     * 
     */
    bindPoivs() {
      getPoivs().then((res: any) => {
        console.log('拿到数据')
        // 一次性挂载
        const promise: Promise<any> = Cesium.GeoJsonDataSource.load(res, { markerSize: 40, markerColor: Cesium.Color.BLACK })
        promise.then((dataSource: Cesium.GeoJsonDataSource) => {
          this.hasPoivs = true
          DataSource = dataSource
          // 设置聚合规则
          dataSource.clustering.enabled = true
          dataSource.clustering.clusterBillboards = true
          dataSource.clustering.clusterLabels = false
          dataSource.clustering.clusterPoints = false
          dataSource.clustering.pixelRange = 40
          dataSource.clustering.minimumClusterSize = 4  //可以聚类的最小屏幕空间对象数。
          dataSource.clustering.clusterEvent.addEventListener((entities, cluster) => {
            console.log('entities计算数量', entities.length)
            // let maxSocreEntity:Cesium.Entity = entities[0]
            // entities.forEach((element:Cesium.Entity) => {
            //   if(maxSocreEntity?.properties?.score<element?.properties?.score){
            //     maxSocreEntity = element
            //   }
            // });

            cluster.label.show = false
            // cluster.label.text = maxSocreEntity?.properties?.name + maxSocreEntity?.properties?.score
            cluster.billboard.show = true
            cluster.billboard.image = SETTING.POINTCOLLECT
            cluster.billboard.scale = 0.4;
          })
          const entities = dataSource.entities.values;
          for (let i = 0; i < entities.length; i++) {
            const entity: any = entities[i];
            entity.billboard.image = SETTING.POINTNORMAL
            entity.billboard.scale = 0.2;
            // entity.billboard.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(41,  CesiumSdk.levelToHeight(entity.properties.level));
            // entity.billboard.scaleByDistance = new Cesium.NearFarScalar(3000000, 1, SETTING.MAXIMUMZOOMDISTANCE, 0.1);
          }
          window['viewer'].dataSources.add(dataSource);
          this.initClickElevent()
        })
      })
    },
    unBindPoivs() {
      this.hasPoivs = false
      window['viewer'].dataSources.remove(DataSource);
    },

    /**
   * 初始化点击事件
   */
    initClickElevent() {
      // 单击事件
      window['viewer'].screenSpaceEventHandler.setInputAction((movement: any) => {
        const pickedFeature = window['viewer'].scene.pick(movement.position);
        console.log("点击事件", movement, pickedFeature);
        // 点击的是广告牌
        if (pickedFeature != undefined && pickedFeature.id.billboard) {
          const target = Object.assign({}, CesiumSdk.c3ToGraphic(pickedFeature.id.position._value), { height: pickedFeature.id.properties.height })
          console.log('target', target, pickedFeature.id.position)
          CesiumSdk.flyToPosition(target).then(() => {
            console.log('飞到目的地了')
          })
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // 相机移动监听事件
      window['viewer'].camera.changed.addEventListener(() => {
        const center = CesiumSdk.getCurrentCartesian3({
          viewer: window['viewer'],
          cesium: window['cesium']
        });
        CurrentLevel = CesiumSdk.heightToLevel(center.height)
        console.log('当前高度层级', CurrentLevel)

      })
    },
    clickHome() {
      CesiumSdk.flyToPosition(this.homeLocation)
    },
    /**
     * 显示三维地名
     */
    showWtfs() {
      utils.loadScript(process.env.VUE_APP_CDN_HOST + "Cesium/CesiumTdt.js").then(() => {
        console.log('VUE_APP_CDN_HOST')
        CesiumSdk.loadWTFS()
      })
    },
    unBindPath() {
      this.hasPath = false
      PathEntityIds.forEach(id => {
        window['viewer'].entities.removeById(id)
      });

    },

    _createPath(pos:[point,point],startTime:Date = new Date(2021, 12, 25)){

      const start = Cesium.JulianDate.fromDate(startTime);
      const stop = Cesium.JulianDate.addSeconds(
        start,
        clocktime,
        new Cesium.JulianDate()
      );
      //Make sure viewer is at the desired time.
      // window['viewer'].clock.startTime = start.clone();
      // window['viewer'].clock.stopTime = stop.clone();
      // window['viewer'].clock.currentTime = start.clone();
      // window['viewer'].clock.clockRange = Cesium.ClockRange.LOOP_STOP;
      window['viewer'].clock.multiplier = 10;
    //    pos = [{
    //     longitude: 120.886,
    //     latitude: 29.5198,
    //     height: 0,
    //   },
    //   {
    //     longitude: -150.1,
    //     latitude: 80.118,
    //     height: 0,
    //   },
    // ]
      // 方案0 A点绕B点旋转固定角度 调用C3的矩阵运算
      // 参考链接 https://www.cnblogs.com/fengyingwang/p/14028744.html

      //     return
      // 方案一 参考http://www.360doc.com/content/16/0921/12/27246049_592495144.shtml
      // 思想：两点中心点p，绕第一点a旋转角度，得到另一个点
      const a = Cesium.Cartesian3.normalize(Cesium.Cartesian3.fromDegrees(pos[0].longitude, pos[0].latitude, 0), new Cesium.Cartesian3())
      const b = Cesium.Cartesian3.normalize(Cesium.Cartesian3.fromDegrees(pos[1].longitude, pos[1].latitude, 0), new Cesium.Cartesian3())
      // 获取ab中心点p
      const p = Cesium.Cartesian3.normalize(Cesium.Cartesian3.add(a,
        Cesium.Cartesian3.multiplyByScalar(
          Cesium.Cartesian3.subtract(b, a,
            new Cesium.Cartesian3()), 0.5, new Cesium.Cartesian3()
        ), new Cesium.Cartesian3()), new Cesium.Cartesian3())
      const radians = (Math.random()>0.5?-1:1)*Cesium.Math.toRadians(this.pathForm.radians||35)
      // P'=P * cosθ + (A×P)sinθ +A(A·P)(1 - cosθ)
      const c = {
        x: p.x * Math.cos(radians) + (a.y * p.z - a.z * p.y) * Math.sin(radians) + a.x * (a.x * p.x + a.y * p.y + a.z * p.z) * (1 - Math.cos(radians)),
        y: p.y * Math.cos(radians) + (a.z * p.x - a.x * p.z) * Math.sin(radians) + a.y * (a.x * p.x + a.y * p.y + a.z * p.z) * (1 - Math.cos(radians)),
        z: p.z * Math.cos(radians) + (a.x * p.y - a.y * p.x) * Math.sin(radians) + a.z * (a.x * p.x + a.y * p.y + a.z * p.z) * (1 - Math.cos(radians))
      }
      // 
      const cGraphic = CesiumSdk.c3ToGraphic(new Cesium.Cartesian3(c.x, c.y, c.z))
      pos.splice(1, 0, {
        longitude: cGraphic.longitude,
        latitude: cGraphic.latitude,
        height: 0
      })
      const step = clocktime / pos.length
      const property = new Cesium.SampledPositionProperty()
      for (let i = 0; i < pos.length; i++) {
        console.log(i * step)
        const item = pos[i]
        const time = Cesium.JulianDate.addSeconds(
          start,
          i * step,
          new Cesium.JulianDate()
        );
        const position = Cesium.Cartesian3.fromDegrees(item.longitude, item.latitude, item.height)
        property.addSample(time, position);

        //Also create a point for each sample we generate.
        const entities = window['viewer'].entities.add({
          position: position,
          point: {
            pixelSize: i==1?0:2,
            color: Cesium.Color.TRANSPARENT,
            outlineColor: Cesium.Color.RED,
            outlineWidth: i==1?0:2,
          },
        });
        PathEntityIds.push(entities.id)
      }
      const entities = window['viewer'].entities.add({
        //Set the entity availability to the same interval as the simulation time.
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({
            start: start,
            stop: stop,
          }),
        ]),

        //Use our computed positions
        position: property,

        //Automatically compute orientation based on position movement.
        orientation: new Cesium.VelocityOrientationProperty(property),

        //Load the Cesium plane model to represent the entity
        model: {
          uri: "./Cesium_Man.glb",
          minimumPixelSize: 64,
        },

        //Show the path as a pink line sampled in 1 second increments.
        path: {
          resolution: 1,
          material: new Cesium.PolylineDashMaterialProperty({
            dashLength: 10,
            color: new Cesium.Color(0.8, 1, 0, 0.5),
            // taperPower:0.1,
          }),
          width: 2,
        },
      });
      PathEntityIds.push(entities.id)
      this.hasPath = true
      setTimeout(() => {
        entities.position['setInterpolationOptions']({
          interpolationDegree: 5,
          interpolationAlgorithm:
            Cesium.LagrangePolynomialApproximation,
        })
      })
    },
    initBindPath() {
      this.showPathConf = false
      getPoivPath({count:this.pathForm.count}).then((res:any)=>{
        const list:point[] = res.list
        const arr:[point,point][] = []
        for(let i = 1; i<list.length; i++){
          arr.push([list[i-1],list[i]])
        }
        this.pathLen = arr.length
        this.pathcurIndex = 0
        arr.forEach((item,index)=>{
         
          this._createPath(item,new Date(utils.dateAddDays(SimulationDate,index)))
        })
      })
    },
    startmove(){
      
      // window['viewer'].clock.shouldAnimate = false
      const start = Cesium.JulianDate.fromDate(new Date(utils.dateAddDays(SimulationDate,this.pathcurIndex)));
      const stop = Cesium.JulianDate.addSeconds(
        start,
        clocktime,
        new Cesium.JulianDate()
      );
      window['viewer'].clock.onStop.addEventListener(function(e:any){
        console.log('xxx',e)
      })
      
      window['viewer'].clock.startTime = start.clone();
      window['viewer'].clock.stopTime = stop.clone();
      window['viewer'].clock.currentTime = start.clone();
      if(this.pathcurIndex>=this.pathLen-1){
        this.pathcurIndex = 0
      }else{
        this.pathcurIndex++
      }
      // new Cesium.Event().addEventListener(window['viewer'].clock.onStop,(e:any)=>{
      //   console.log('xxx',e)
      // })
    },
    changeViewPitch(){
      // const rect = CesiumSdk.getCurrentViewRect();
      window['viewer'].camera.setView({
        destination :Cesium.Cartesian3.fromDegrees(this.homeLocation.longitude, this.homeLocation.latitude, 10000000),
        orientation: {
            heading : Cesium.Math.toRadians(0.0), // 方向
            pitch : Cesium.Math.toRadians(-60.0),// 倾斜角度
            roll : 0
        },
        convert:false
    });
    }
  
  },
  created() {

  },
  mounted() { 
    // this.$alert(222)
    console.log(this)
  },
  unmounted() { },
  setup() { },
});