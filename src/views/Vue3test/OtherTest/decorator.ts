/*
 * @Description: 修饰器的定义和使用
 * @Author: yanyuanfeng
 * @Date: 2022-07-07 13:50:46
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-07-07 17:36:04
 */
// 这是第三方插件 集成了常用基础的装饰器
import debounce from 'lodash-decorators/debounce';
import Util from "@/utils/index"
function mydebounce(wait:number) {
  return function(target:Object,name?:string, descriptor?:any) {
    descriptor.value = Util.debounce(descriptor.value, wait)
  }
}

// 类属性装饰器可以用在类的单个成员上，无论是类的属性、方法、get/set函数。该装饰器函数有3个参数：
/**
 * 类属性装饰器 readonly
 * @param target  成员所在的类
 * @param name 类成员的名字
 * @param descriptor  属性描述符。
 * @returns 
 */
function readonly(target:Object, name?:string, descriptor?:any) {
  descriptor.writable = false;
  console.log(target,name,descriptor)
  return descriptor;
}


export default class Example {
  @mydebounce(1000)
  a() {
    console.log(11)
  }
  @debounce(1000)
  a2() {
    console.log(22)
  }

  @readonly
  b() {}
}

