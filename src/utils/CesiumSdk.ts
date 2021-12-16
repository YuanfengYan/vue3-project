/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-12-15 19:06:46
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-16 16:33:44
 */
export default {
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
}