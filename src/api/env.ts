/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 16:10:20
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-10-26 17:03:39
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
};
