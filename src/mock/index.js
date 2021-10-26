/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 16:49:14
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-10-26 16:50:31
 */
import Mock from 'mockjs'
Mock.mock(/\/v1\/user\/login/, 'get', {name:1})
