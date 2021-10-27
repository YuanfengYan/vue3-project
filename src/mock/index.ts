/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 16:49:14
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-10-27 14:49:37
 */
import Mock from "mockjs"
Mock.mock(/\/v1\/user\/login/, 'get', {name:1})
