/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-12-15 19:06:46
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-20 17:02:29
 */
export default {
   /**
   * 加载三维地名服务
   * @param {*} params
   */
    loadWTFS() {
      // const { token, Cesium, viewer, scale, outlineWidth, font } = params;
      // 服务域名
      const tdtUrl = "https://t{s}.tianditu.gov.cn/";
      // 服务负载子域
      const subdomains = ["0", "1", "2", "3", "4", "5", "6", "7"];
      window['wtfs'] = new Cesium['GeoWTFS']({
        viewer:window['viewer'],
        subdomains: subdomains,
        metadata: {
          boundBox: {
            minX: -180,
            minY: -90,
            maxX: 180,
            maxY: 90
          },
          minLevel: 4,
          maxLevel: 20
        },
        depthTestOptimization: false,
        //   dTOElevation: 15000,
        //   dTOPitch: Cesium.Math.toRadians(-70),
        aotuCollide: true, //是否开启避让
        //   aotuCollide: false, //是否开启避让
        collisionPadding: [5, 10, 8, 5], //开启避让时，标注碰撞增加内边距，上、右、下、左
        //   collisionPadding: [0, 0, 0, 0], //开启避让时，标注碰撞增加内边距，上、右、下、左
        serverFirstStyle: true, //服务端样式优先
        labelGraphics: {
          // font: " bold 32px sans-serif ",
          font: " bold 32px sans-serif ",
          fillColor: Cesium.Color.WHITE,
          scale:  0.5,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 2,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          showBackground: false,
          backgroundColor: Cesium.Color.RED,
          backgroundPadding: new Cesium.Cartesian2(10, 10),
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.TOP,
          // verticalOrigin: Cesium.VerticalOrigin.CENTER,
          eyeOffset: Cesium.Cartesian3.ZERO,
          pixelOffset: new Cesium.Cartesian2(0, 8)
        },
        billboardGraphics: {
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          eyeOffset: Cesium.Cartesian3.ZERO,
          pixelOffset: Cesium.Cartesian2.ZERO,
          alignedAxis: Cesium.Cartesian3.ZERO,
          color: Cesium.Color.WHITE,
          rotation: 0,
          scale: 1,
          width: 18,
          height: 18
        }
      });
      const token = '658771e458777765b07dd4193917e23c'//https://uums.tianditu.gov.cn/register 获取token
      //三维地名服务，使用wtfs服务
      window['wtfs'].getTileUrl = function() {
        return tdtUrl + "mapservice/GetTiles?lxys={z},{x},{y}&tk=" + token;
      };
  
      window['wtfs'].getIcoUrl = function() {
        return tdtUrl + "mapservice/GetIcon?id={id}&tk=" + token;
      };
  
      window['wtfs'].initTDT([
        {
          x: 6,
          y: 1,
          level: 2,
          boundBox: { minX: 90, minY: 0, maxX: 135, maxY: 45 }
        },
        {
          x: 7,
          y: 1,
          level: 2,
          boundBox: { minX: 135, minY: 0, maxX: 180, maxY: 45 }
        },
        {
          x: 6,
          y: 0,
          level: 2,
          boundBox: { minX: 90, minY: 45, maxX: 135, maxY: 90 }
        },
        {
          x: 7,
          y: 0,
          level: 2,
          boundBox: { minX: 135, minY: 45, maxX: 180, maxY: 90 }
        },
        {
          x: 5,
          y: 1,
          level: 2,
          boundBox: { minX: 45, minY: 0, maxX: 90, maxY: 45 }
        },
        {
          x: 4,
          y: 1,
          level: 2,
          boundBox: { minX: 0, minY: 0, maxX: 45, maxY: 45 }
        },
        {
          x: 5,
          y: 0,
          level: 2,
          boundBox: { minX: 45, minY: 45, maxX: 90, maxY: 90 }
        },
        {
          x: 4,
          y: 0,
          level: 2,
          boundBox: { minX: 0, minY: 45, maxX: 45, maxY: 90 }
        },
        {
          x: 6,
          y: 2,
          level: 2,
          boundBox: { minX: 90, minY: -45, maxX: 135, maxY: 0 }
        },
        {
          x: 6,
          y: 3,
          level: 2,
          boundBox: { minX: 90, minY: -90, maxX: 135, maxY: -45 }
        },
        {
          x: 7,
          y: 2,
          level: 2,
          boundBox: { minX: 135, minY: -45, maxX: 180, maxY: 0 }
        },
        {
          x: 5,
          y: 2,
          level: 2,
          boundBox: { minX: 45, minY: -45, maxX: 90, maxY: 0 }
        },
        {
          x: 4,
          y: 2,
          level: 2,
          boundBox: { minX: 0, minY: -45, maxX: 45, maxY: 0 }
        },
        {
          x: 3,
          y: 1,
          level: 2,
          boundBox: { minX: -45, minY: 0, maxX: 0, maxY: 45 }
        },
        {
          x: 3,
          y: 0,
          level: 2,
          boundBox: { minX: -45, minY: 45, maxX: 0, maxY: 90 }
        },
        {
          x: 2,
          y: 0,
          level: 2,
          boundBox: { minX: -90, minY: 45, maxX: -45, maxY: 90 }
        },
        {
          x: 0,
          y: 1,
          level: 2,
          boundBox: { minX: -180, minY: 0, maxX: -135, maxY: 45 }
        },
        {
          x: 1,
          y: 0,
          level: 2,
          boundBox: { minX: -135, minY: 45, maxX: -90, maxY: 90 }
        },
        {
          x: 0,
          y: 0,
          level: 2,
          boundBox: { minX: -180, minY: 45, maxX: -135, maxY: 90 }
        }
      ]);
    },
  /**
  * c3转经纬度
  */
  c3ToGraphic: function (c3: Cesium.Cartesian3) {
    const cartographic = Cesium.Cartographic.fromCartesian(c3);
    const longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(
      10
    );
    const latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(
      10
    );
    const graphic = {
      longitude: longitudeString,
      latitude: latitudeString
    };
    return graphic;
  },
  /**
   * 获取当前Cartesian3
   * 经，维度，高度
   */
  getCurrentCartesian3: function (params:any) {
    const { viewer, cesium } = params;
    // 获取当前镜头位置的笛卡尔坐标
    const cameraPos = viewer.camera.position;
    // 获取当前坐标系标准
    const ellipsoid = viewer.scene.globe.ellipsoid;
    // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
    const cartographic = ellipsoid.cartesianToCartographic(cameraPos);
    // 根据上面当前镜头的位置，获取该中心位置的经纬度坐标
    const centerLon = cesium.Math.toDegrees(cartographic.longitude);
    const centerLat = cesium.Math.toDegrees(cartographic.latitude);

    //动态计算合适的飞行高度
    return {
      longitude: centerLon,
      latitude: centerLat,
      height: cartographic.height
    };
  },
  /**
   * 高度转层级
   */
   heightToLevel(height:number) {
    const A = 40487.57;
    const B = 0.00007096758;
    const C = 91610.74;
    const D = -40467.74;
    return Math.round(D + (A - D) / (1 + Math.pow(height / C, B)));
  },
  /**
   * 层级转高度
   */
   levelToHeight(level:number) {
    level = Number(level);
    const A = 40487.57;
    const B = 0.00007096758;
    const C = 91610.74;
    const D = -40467.74;
    const x = (A - D) / (level - D) - 1;
    return Math.round(Math.pow(x, 1 / B) * C);
  },

   /**
   * 飞到指定地点
   */
  flyToPosition(geo:any):Promise<void> {
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
}