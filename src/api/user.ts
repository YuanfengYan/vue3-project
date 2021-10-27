/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 15:56:50
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-10-27 14:45:59
 */
import Http from "@/api/http";
export const loginApi = (data:any)=>{
  return Http.get("/v1/user/login", data);
}