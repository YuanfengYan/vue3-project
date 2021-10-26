/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 16:10:20
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-10-26 16:13:45
 */
if (process.env.VUE_APP_ENV == "production") {
  console.log = () => {};
}
export default {
  //网关地址/接口地址
  gateway_url: process.env.VUE_APP_GATEWAY_URL,
  //超时时长
  gateway_timeout: 25000,
  //防篡改key
  secret_key: process.env.VUE_APP_SECRET_KEY,
  bingmap_keys:
    process.env.VUE_APP_BINGMAP_KEYS ||
    "Amth7q21aFxI_gUXenf-X_O1VrjbWyzbQdR6MzQmjDuNzeDXaSo45f49aUPwz7x2",
  /***数数相关配置信息开始 默认保证线上正常运行******** */
  //数数appid
  ta_appid: process.env.VUE_APP_TAAPPID || "9ee34ebdc549449d9b8fca2b06792913",
  //数数应用名称
  ta_name: process.env.VUE_APP_TANAME || "ahaearth",
  //数数jssdk地址
  ta_sdkurl:
    process.env.VUE_APP_TASDKURL ||
    "https://staticae.ahaschool.com.cn/plugins/thinkingdata.min.js",
  //数数数据上报地址
  ta_serverurl:
    process.env.VUE_APP_TASERVERURL || "https://ta.ahaschool.com.cn/sync_js",
  /***数数相关配置信息结束******** */
  //天地图秘钥 , 分割
  tianmap_keys:
    process.env.VUE_APP_TIANMAP_KEYS || "c480f3a4d1946bf9b585159c1039618d"
};
