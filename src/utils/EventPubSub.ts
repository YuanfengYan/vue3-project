/*
 * @Description: 发布订阅
 * @Author: yanyuanfeng
 * @Date: 2021-12-30 16:20:55
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-30 19:02:41
 */
interface handlesObject {
  [propName: string]:Function[]
}
export default class EventPubSub {
  /**
  * 单例
  */
  static instance:EventPubSub|null = null;
  static getInstance() {
    if (!this.instance) {
      this.instance = new EventPubSub()
    }
    return this.instance;
  }

  protected handles:handlesObject

  constructor() {
    /**
     * 存放事件和对应的处理方法
     */
    this.handles = {};
  }
  
  /**
  * 注册事件传入事件类型type和事件处理handle
  * @param {*} type
  * @param {*} handle
  */
  on(type:string, handle:Function) {
    if (!this.handles[type]) {
      this.handles[type] = [];
    }
    this.handles[type].push(handle);
  }

  /**
  * 发布事件
  * @returns
  */
  emit(...arg:any[]) {
    //通过传入参数获取事件类型
    //将arguments转为真数组
    const type = Array.prototype.shift.call(arg);
    if (!this.handles[type]) {
      return false;
    }
    for (let i = 0; i < this.handles[type].length; i++) {
      const handle = this.handles[type][i]; //执行事件
      handle.apply(this, arg);
    }
  }

  /**
  * 取消订阅
  * @param {*} type
  * @param {*} handle
  */
  off(type:string, handle:Function) {
    const handles = this.handles[type];
    if (handles) {
      if (!handle) {
        handles.length = 0; //清空数组
      } else {
        for (let i = 0; i < handles.length; i++) {
          const _handle = handles[i];
          if (_handle === handle) {
            //从数组中删除
            handles.splice(i, 1);
          }
        }
      }
    }
  }
}
