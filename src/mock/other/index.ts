/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2022-08-10 14:40:14
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-08-10 20:06:18
 */
// @ts-nocheck
import Mock from "../mockchanged.js"
Mock.setup({
  timeout: '1000'
})
Mock.mock(/\/v1\/vue\/hoc\/info/, 'get', (e)=>{
  console.log(e)
  return Mock.mock({
    "name": "@ctitle(6,8)",
    "author": /M(r|(iss))_[A-Z][a-z][a-z]/,
    "id|+1": 1,
    "des": "@ctitle(10,20)",
    "catroy|1-4": 1
  })
})
// config