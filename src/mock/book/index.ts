/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-12-21 11:20:32
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-21 14:41:18
 */
// @ts-ignore
import Mock from "../mockchanged.js"

Mock.mock(/\/v1\/book\/list/, 'get', Mock.mock({
 "list|15":[{
  "name":"@ctitle(6,8)",
  "author":/M(r|(iss))_[A-Z][a-z][a-z]/,
  "id|+1":1,
  "des":"@ctitle(10,20)",
  "catroy|1-4":1
  
 }]

}))