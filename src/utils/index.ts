/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-11-12 10:31:54
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-27 16:10:31
 */

import app from '../main'

export default {
  /**
   * 批量注册文件夹下的组件到全局组件
   * @param directory 文件夹目录
   * @param useSubdirectories 是否查找子目录
   * @param regExp 要匹配文件的正则
   */
  batchRegisterComponent(directory: string, useSubdirectories: boolean, regExp: RegExp = /\.vue$/) {
    const requireComponents = require.context(directory, useSubdirectories || false, regExp)
    requireComponents.keys().forEach((fileName) => {
      const componentConfig = requireComponents(fileName)
      const componentName = componentConfig.default.name
      app.component(componentName, componentConfig.default || componentConfig)
    })
  },
  /**
   * 防抖函数
   * @param fn 防抖的目标函数
   * @param t 防抖时间间隔
   */
  debounce(fn: Function, t: number = 100) {
    let timerId: NodeJS.Timeout | null = null
    return function (this:any , ...args: any ) {
      if (timerId) {
        clearTimeout(timerId)
      }
      timerId = setTimeout(() => {
        timerId = null
        fn.call(this, ...args)
      }, t)

    }
  },
  /**
   * 动态加载js
   * @param {*} src
   * @param {*} callback
   */
   loadScript: function(src:string):Promise<void> {
     return new Promise((resolve,reject)=>{
       const script: HTMLScriptElement = document.createElement("script");
       const head: HTMLHeadElement = document.getElementsByTagName("head")[0];
       script.type = "text/javascript";
       script.charset = "UTF-8";
       script.src = src;
       console.log('loadScript')
       if (script.addEventListener) {
         script.addEventListener(
           "load",
           function() {
            resolve();
           },
           false
         );
       } else if(script['attachEvent']){
         script['attachEvent']("onreadystatechange", function() {
           const target = window.event?.srcElement;
           if (target&&target['readyState'] == "loaded") {
            resolve();
           }
         });
       }
       head.appendChild(script);
     })
  },
  /**
 * [dateAddDays 从某个日期增加n天后的日期]
 * @param  {[string]} dateStr  [日期字符串]
 * @param  {[int]} dayCount [增加的天数]
 * @return {[string]}[增加n天后的日期字符串]
 */
 dateAddDays(dateStr:string,dayCount:number) {
  const tempDate=new Date(dateStr.replace(/-/g,"/")).getTime();//把日期字符串转换成日期格式
  const resultDate=new Date((tempDate/1000+(86400*dayCount))*1000);//增加n天后的日期
  const resultDateStr=resultDate.getFullYear()+"-"+(resultDate.getMonth()+1)+"-"+(resultDate.getDate());//将日期转化为字符串格式
  return resultDateStr;
}

}