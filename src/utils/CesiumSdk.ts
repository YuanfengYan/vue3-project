/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-12-15 19:06:46
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-15 19:10:48
 */
export default {
   /**
   * c3转经纬度
   */
    c3ToGraphic: function(c3:Cesium.Cartesian3) {
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
}