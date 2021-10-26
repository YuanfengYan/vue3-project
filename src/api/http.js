/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 15:57:48
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-10-26 17:04:48
 */
import axios from 'axios'
import env from "@/api/env";

/**
 * 对请求头处理事件:参数加密等等
 * @param {*} config 
 * @returns 
 */
function sign(config){
  return config
}
/**
 * 对返回的数据进行拦截处理函数
 */
function responseFn(response){
  
  return response.data
}
/**
 * 返回报错时进行数据拦击处理
 * @param {*} error 
 * @returns 
 */
function responseErrorFn(error){
  console.log('responseErrorFn',error)
  return error
}

/**
 * api请求的初始化
 * @type {string}
 */
 axios.defaults.baseURL = env.gateway_url;
 axios.defaults.timeout = env.gateway_timeout;
 axios.interceptors.response.use(responseFn, responseErrorFn);
 axios.interceptors.request.use(function(config) {
   return sign(config);
 });
 export default {
   /**
    * @title 发送GET请求
    * @param url
    * @param query
    * @returns {*}
    */
   get(url, query = {}) {
     let _url = `${url}`;
     return axios.get(_url, { params: query });
   },
 
   /**
    * @title 发送POST请求
    * @param url
    * @param data
    * @param query
    * @returns {*}
    */
   post(url, data = {},) {
    let _url = `${url}`;
     return axios.post(_url, data);
   }
 };
 



