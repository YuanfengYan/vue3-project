/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 15:57:48
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-21 11:38:22
 */
import axios from 'axios'
import env from "@/api/env";
import Cookies from 'js-cookie'
import { Base64 } from 'js-base64'
import { ElMessage } from 'element-plus'

import {
  getAccessToken,
} from '@/utils/accessToken'

 // create an axios instance
 const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,//'http://192.168.10.238:5000/api/v1',//process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
/**
 * 对请求头处理事件:参数加密等等
 * @param {*} config 
 * @returns 
 */
function sign(config:any){
  
  const base64 = Base64.encode(getAccessToken() + ':')
  config.headers['Authorization'] = 'Basic ' + base64
  return config
}
/**
 * 对返回的数据进行拦截处理函数
 */
function responseFn(response:any){
  console.log(response,'2222')

  const res = response.data
  // if(!res.code){
  //   return response.data
  // }
  // if the custom code is not 20000, it is judged as an error.
  if (res.code !== 200) {
    ElMessage({
      message: res.msg || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    console.log('res.msg ',res.msg )
    return Promise.reject(new Error(res.message || 'Error'))
  } else {
    return res
  }
  
  // return response.data
}
/**
 * 返回报错时进行数据拦击处理
 * @param {*} error 
 * @returns 
 */
function responseErrorFn(error:any){
  console.error('responseErrorFn',error)
  return error
}

/**
 * api请求的初始化
 * @type {string}
 */
//  service.defaults.baseURL = env.gateway_url;
//  service.defaults.timeout = env.gateway_timeout;
service.interceptors.response.use(responseFn, responseErrorFn);
service.interceptors.request.use(function(config) {
   return sign(config);
 });

 export default {
   /**
    * @title 发送GET请求
    * @param url
    * @param query
    * @returns {*}
    */
   get (url:string, query = {}) {
     const _url = `${url}`;
     return service.get(_url, { params: query });
   },
 
   /**
    * @title 发送POST请求
    * @param url
    * @param data
    * @param query
    * @returns {*}
    */
   post(url:string, data = {},) {
    const _url = `${url}`;
     return service.post(_url, data);
   },
   delete(url:string, data = {},) {
    const _url = `${url}`;
     return service.delete(_url, data);
   },
   put(url:string, data = {},) {
    const _url = `${url}`;
     return service.put(_url, data);
   }
 };
 



