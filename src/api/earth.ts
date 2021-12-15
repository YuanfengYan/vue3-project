/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-12-15 10:14:34
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-15 14:46:27
 */

import Http from "@/api/http";
export const getPoivs = async ()=>{
  return  Http.get("/v1/earth/allpoivs");
}

