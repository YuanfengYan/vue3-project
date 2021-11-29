/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-11-12 10:31:54
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-11-12 11:11:18
 */

import app from '../main'

export default {
  /**
   * 批量注册文件夹下的组件到全局组件
   * @param directory 文件夹目录
   * @param useSubdirectories 是否查找子目录
   * @param regExp 要匹配文件的正则
   */
  batchRegisterComponent(directory:string, useSubdirectories:boolean, regExp:RegExp = /\.vue$/){
    const requireComponents = require.context(directory, useSubdirectories||false, regExp)
    requireComponents.keys().forEach((fileName) => {
      const componentConfig = requireComponents(fileName)
      const componentName = componentConfig.default.name
      app.component(componentName, componentConfig.default || componentConfig)
    })
  }
}