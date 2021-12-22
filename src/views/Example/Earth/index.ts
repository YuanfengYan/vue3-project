
// import { Cesium } from 'Cesium'
import { defineComponent } from 'vue';
import { getPoivs } from '@/api/earth';
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
// interface dataSourceObj{

// }
let CurrentLevel: number = 1
let DataSource: Cesium.GeoJsonDataSource
let trackedEntity: any
// let dataSourceAll:any = null
// let currentClustering = null //当前聚合的事件
export default defineComponent({
  data() {
    return {
      homeLocation: {
        longitude: 120.886,
        latitude: 29.5198,
        height: 10000,
      }
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
      window['cesium'].Globe.tileCacheSize = 10;
      //获取或设置被视为“太多”的加载子体分幅数。如果一个磁贴有太多的加载子体，则该磁贴将在加载和渲染其任何子体之前加载和渲染。这意味着用户可以得到更多的反馈，即某些事情正在以更长的总体加载时间为代价发生。将此设置为0将导致依次加载每个磁贴级别，从而显著增加加载时间。将其设置为较大的数字（例如1000）将最大限度地减少加载的磁贴数量，但往往会在长时间等待后立即显示所有细节。默认20
      //  window['cesium'].Globe.loadingDescendantLimit = 30;
      window['viewer'].scene.screenSpaceCameraController.maximumZoomDistance = SETTING.MAXIMUMZOOMDISTANCE;
      window['viewer'].scene.screenSpaceCameraController.minimumZoomDistance = SETTING.MINIMUMZOOMDISTANCE;
      //  window['viewer'].scene.screenSpaceCameraController.enableTilt = false;
      //  window['viewer'].scene.screenSpaceCameraController.inertiaSpin = 0.9;
      // window['viewer'].scene.screenSpaceCameraController.inertiaTranslate = 0.9;
      // window['viewer'].scene.screenSpaceCameraController.inertiaZoom = 0.9;
      // window['viewer'].scene.screenSpaceCameraController._zoomFactor = 5;
      // window['cesium'].Camera.DEFAULT_VIEW_RECTANGLE = window['cesium'].Rectangle.fromDegrees(80, 26, 150.0, 35.5);
      // this.bindPoivs()
      // const cc = [new Cesium.Cartesian3(0.1, 0, 0.8), new Cesium.Cartesian3(0.4, 0, 0), new Cesium.Cartesian3(0.2, 0.4, 0)]
      this.showWtfs()
      // this.trackView(cc)
    },
    /**
     * 接口请求拿到数据点=》绑定poiv到地球上（并设置聚合规则）
     * 
     */
    bindPoivs() {
      getPoivs().then((res: any) => {
        console.log('拿到数据')
        // console.log(res,Cesium)
        // const allpromise : Promise<any>[]= [
        //   Cesium.GeoJsonDataSource.load(res[4], { markerSize: 40 }),
        //   Cesium.GeoJsonDataSource.load(res[5], { markerSize: 50 }),
        //   Cesium.GeoJsonDataSource.load(res[6], { markerSize: 60 }),
        // ]

        // Promise.all(allpromise).then((dataSourceArr: Cesium.GeoJsonDataSource[])=>{
        //   // 保存每个层级的dataSource 用于后续对应层级进行聚合
        //   dataSourceAll = {
        //     4:dataSourceArr[0],
        //     5:dataSourceArr[1],
        //     6:dataSourceArr[2]
        //   }
        //   // 挂载每个层级的poiv
        //   for(let i = 0 ; i< dataSourceArr.length ; i++){
        //     const entities = dataSourceArr[i].entities.values;
        //     console.log(entities[0])
        //     for (let i = 0; i < entities.length; i++) {
        //       const entity: any = entities[i];
        //       entity.billboard.image = SETTING.POINTNORMAL
        //       entity.billboard.scale = 0.2;
        //       entity.billboard.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(41,  CesiumSdk.levelToHeight(entity.properties.level));
        //       // entity.billboard.scaleByDistance = new Cesium.NearFarScalar(3000000, 1, SETTING.MAXIMUMZOOMDISTANCE, 0.1);
        //     }
        //   }
        // })

        // 一次性挂载

        const promise: Promise<any> = Cesium.GeoJsonDataSource.load(res, { markerSize: 40, markerColor: Cesium.Color.BLACK })
        promise.then((dataSource: Cesium.GeoJsonDataSource) => {
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
      window['viewer'].dataSources.remove(DataSource);
    },
    onEntityEvt(e: any) {
      console.log('onEntityEvt', e)
    },
    /**
     * 曲线加载完成
     */
    polylineReady(params: any) {
      console.log('params', params)
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

    // trackView(myPositions: any) {

    //   if (trackedEntity) window['viewer'].entities.remove(trackedEntity)
    //   trackedEntity = undefined
    //   window['viewer'].trackedEntity = undefined

    //   window['viewer'].clock.shouldAnimate ? '' : window['viewer'].clock.shouldAnimate = true
    //   //Set bounds of our simulation time
    //   const start = Cesium.JulianDate.fromDate(new Date());
    //   const stop = Cesium.JulianDate.addSeconds(
    //     start,
    //     myPositions.length - 1,
    //     new Cesium.JulianDate()
    //   );

    //   //Make sure viewer is at the desired time.
    //   window['viewer'].clock.startTime = start.clone();
    //   window['viewer'].clock.stopTime = stop.clone();
    //   window['viewer'].clock.currentTime = start.clone();
    //   window['viewer'].clock.clockRange = Cesium.ClockRange.CLAMPED//CLAMPED:达到终止时间后停止,LOOP_STOP:达到终止时间后重新循环,UNBOUNDED:达到终止时间后继续读秒
    //   window['viewer'].clock.multiplier = 1//this.m_multiplier; // 默认为1

    //   //Set timeline to simulation bounds
    //   // window['viewer'].timeline.zoomTo(start, stop);
    //   //Generate a random circular pattern with varying heights.
    //   function computeCirclularFlight() {
    //     const property = new Cesium.SampledPositionProperty();
    //     //设置插入选项
    //     property.setInterpolationOptions({
    //       interpolationDegree: 2,
    //       interpolationAlgorithm: Cesium.HermitePolynomialApproximation,
    //     });
    //     for (let i = 0; i < myPositions.length; i++) {
    //       const time = Cesium.JulianDate.addSeconds(
    //         start,
    //         i,
    //         new Cesium.JulianDate()
    //       );
    //       property.addSample(time, myPositions[i]);
    //     }
    //     return property;
    //   }
    //   const position = computeCirclularFlight();

    //   if (!position) return
    //   //Actually create the entity
    //   const entity = window['viewer'].entities.add({
    //     //将实体可用性设置为与模拟时间相同的间隔
    //     availability: new Cesium.TimeIntervalCollection([
    //       new Cesium.TimeInterval({
    //         start: start,
    //         stop: stop,
    //       }),
    //     ]),
    //     //计算的位置
    //     position: position,
    //     //基于位置移动自动计算方向.
    //     orientation: new Cesium.VelocityOrientationProperty(position),

    //     //将路径显示为以1秒为增量采样的粉红线.
    //     path: {
    //       resolution: 1,
    //       material: new Cesium.PolylineGlowMaterialProperty({
    //         glowPower: 0.15,
    //         color: Cesium.Color.FORESTGREEN.withAlpha(0.6),
    //       }),
    //       width: 10,
    //       // distanceDisplayCondition: new window.Cesium.DistanceDisplayCondition (30),
    //     },
    //   });
    //   trackedEntity = entity
    //   window['viewer'].trackedEntity = trackedEntity;

    // },
  },
    created() {

    },
    mounted() { },
    unmounted() { },
    setup() { },
  });