/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2022-07-20 18:14:21
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-07-20 18:43:28
 */

// @ts-nocheck 
const Mydrag:{[key:string]:any}  = {}
Mydrag.install = function(app:any,option:any){
  app.directive('my-drag',{
    // 指令具有一组生命周期钩子：
    // 在绑定元素的 attribute 或事件监听器被应用之前调用
    created(...arg) {
      console.log(arg)
    },
    // 在绑定元素的父组件挂载之前调用
    beforeMount() {},
    // 在绑定元素的父组件挂载之后调用
    mounted(el,binding,vnode) {
        // let wMax = document.documentElement.clientWidth - el.offsetWidth;
        // let hMax = document.documentElement.clientHeight - el.offsetHeight;
        el.onmousedown = function (e) {
                
          const time1 = new Date().getTime();
          const x = e.pageX - el.offsetLeft;
          const y = e.pageY - el.offsetTop;
          document.onmousemove = function (e) {
              e.preventDefault();
              const time2 = new Date().getTime();
              if (time2 - time1 > 300) {
                  el.classList.remove('v-drag-inactive')
                  el.classList.add('v-drag-active')
              }
              el.style.left = e.pageX - x + 'px';
              el.style.top = e.pageY - y + 'px';
          }
          document.onmouseup = function () {
              const time2 = new Date().getTime();
              if (time2 - time1 > 300) {
                  el.classList.remove('v-drag-active')
                  el.classList.add('v-drag-inactive')
              }
              document.onmousemove = document.onmouseup = null;
          }
      }
    },
    // 在包含组件的 VNode 更新之前调用
    beforeUpdate() {},
    // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
    updated() {},
    // 在绑定元素的父组件卸载之前调用
    beforeUnmount() {},
    // 在绑定元素的父组件卸载之后调用
    unmounted() {}

    })
}
export default Mydrag