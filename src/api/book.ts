/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-12-21 11:19:40
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-21 11:40:10
 */
import Http from "@/api/http";
export const getBookList = async ()=>{
  return await Http.get("/v1/book/list");
}

