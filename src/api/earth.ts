/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-12-15 10:14:34
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-24 16:53:48
 */

import Http from "@/api/http";
export const getPoivs = async ()=>{
  return  Http.get("/v1/earth/allpoivs");
}

// 路径
export const getPoivPath = async (data:{count:number})=>{
  return  Http.post("/v1/earth/poivpath",{count:data.count});
}

