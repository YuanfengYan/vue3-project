
// import { Cesium } from 'Cesium'
import { defineComponent } from 'vue';
import { getPoivs } from '@/api/earth';
import CesiumSdk from "@/utils/CesiumSdk"
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
let CurrentLevel: number = 1
export default defineComponent({
  data() {
    return {
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
      this.bindPoivs()
    },
    /**
     * 接口请求拿到数据点=》绑定poiv到地球上（并设置聚合规则）
     * 
     */
    bindPoivs() {
      getPoivs().then((res: any) => {
        // console.log(res,Cesium)
        const promise: Promise<any> = Cesium.GeoJsonDataSource.load(res, { markerSize: 40, markerColor: Cesium.Color.BLACK })
        promise.then((dataSource: Cesium.GeoJsonDataSource) => {
          // 设置聚合规则
          // dataSource.clustering.enabled = true
          // dataSource.clustering.clusterBillboards = true
          // dataSource.clustering.pixelRange = 60
          // dataSource.clustering.minimumClusterSize = 4  //可以聚类的最小屏幕空间对象数。
          // dataSource.clustering.clusterEvent.addEventListener((entities, cluster) => {
          //   // cluster.label.show = false
          //   cluster.billboard.show = true
          //   cluster.billboard.image = SETTING.POINTCOLLECT
          //   cluster.billboard.scale = 0.4;
          // })
          const entities = dataSource.entities.values;
          console.log(entities[0])
          for (let i = 0; i < entities.length; i++) {
            const entity: any = entities[i];
            entity.billboard.image = SETTING.POINTNORMAL
            entity.billboard.scale = 0.2;
            entity.billboard.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(41,  CesiumSdk.levelToHeight(entity.properties.level));
            // entity.billboard.scaleByDistance = new Cesium.NearFarScalar(3000000, 1, SETTING.MAXIMUMZOOMDISTANCE, 0.1);
          }
          window['viewer'].dataSources.add(dataSource);
          this.initClickElevent()
        })
      })
    },

    /**
     * 飞到指定地点
     */
    flyToPosition(geo:any):Promise<void> {
      console.log('geo',geo)
      return new Promise((resolve,reject)=>{
        window['viewer'].camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(Number(geo.longitude), Number(geo.latitude), geo.height),
          duration: 2,
          complete: function () {
            resolve()
          },
          cancel:function(){
            reject()
          }
        });
      })
    },
    /**
   * 初始化点击事件
   */
    initClickElevent() {
      // 单击事件
      window['viewer'].screenSpaceEventHandler.setInputAction((movement:any)=> {
        const pickedFeature =  window['viewer'].scene.pick(movement.position);
        console.log("点击事件", movement,pickedFeature);
        // 点击的是广告牌
        if (pickedFeature != undefined && pickedFeature.id.billboard) {
          const target = Object.assign({},CesiumSdk.c3ToGraphic(pickedFeature.id.position._value),{height:pickedFeature.id.properties.height})
          console.log('target',target,pickedFeature.id.position)
          this.flyToPosition(target).then(()=>{
            console.log('飞到目的地了')
          })
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // 相机移动监听事件
      window['viewer'].camera.changed.addEventListener(()=>{
        const center = CesiumSdk.getCurrentCartesian3({
          viewer:  window['viewer'],
          cesium: window['cesium']
        });
        CurrentLevel = CesiumSdk.heightToLevel(center.height)
        console.log('当前高度层级',CurrentLevel)

     })
    },
  },
  created() {

  },
  mounted() { },
  unmounted() { },
  setup() { },
});