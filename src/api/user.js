/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 15:56:50
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-10-26 16:42:47
 */
import Http from "@/api/http";
export const loginApi = (data)=>{
  return Http.get("/v1/user/login", data);
}