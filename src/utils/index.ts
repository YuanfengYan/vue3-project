/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-11-12 10:31:54
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-14 14:17:33
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
   loadScript: function(src:string, callback:Function) {
    const script: HTMLScriptElement = document.createElement("script");
    const head: HTMLHeadElement = document.getElementsByTagName("head")[0];
    script.type = "text/javascript";
    script.charset = "UTF-8";
    script.src = src;
    if (script.addEventListener) {
      script.addEventListener(
        "load",
        function() {
          callback();
        },
        false
      );
    } else if(script['attachEvent']){
      script['attachEvent']("onreadystatechange", function() {
        const target = window.event?.srcElement;
        if (target&&target['readyState'] == "loaded") {
          callback();
        }
      });
    }
    head.appendChild(script);
  },
}