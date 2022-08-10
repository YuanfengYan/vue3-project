/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2022-08-10 14:41:35
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-08-10 14:42:18
 */
import Http from "@/api/http";
export const gethocInfo = async ()=>{
  return  Http.get("/v1/vue/hoc/info");
}
