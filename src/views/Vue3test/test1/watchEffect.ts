/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2022-03-03 15:32:25
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-08-01 17:55:03
 */
import {reactive, ref,watchEffect,nextTick} from 'vue';
export default function testWacthEffect(){
  // card1
    const toal = ref(1)
    const product = reactive({
      price:10,
      count:2
    })
    setTimeout(()=>{
      toal.value++
       product.price++
      //  当同步修改多个watchEffect中的依赖，watchEffect只会执行一次，在nextTick中执行，就会分两次执行watchEffect
      nextTick(()=>{ 
        product.count++
      })
    },3000)
    let num = 0
    watchEffect((onInvalidate)=>{
      num++
      console.log('执行次数',num,toal.value)
      toal.value = product.price *  product.count
      onInvalidate(()=>{
        console.log('watchEffect重新运行了')//会在重新运行时或者停止时先执行
      })
    },{
      flush: 'pre',//默认pre。 其他：pre,post,sync
      // flush取值：
      //   pre （默认）
      //   post （在组件更新后触发，这样你就可以访问更新的 DOM。这也将推迟副作用的初始运行，直到组件的首次渲染完成。）
      //   sync （与watch一样使其为每个更改都强制触发侦听器，然而，这是低效的，应该很少需要）

    })



    return {
      // card1
      toal,
      product
      // 
    }
  }