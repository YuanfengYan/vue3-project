/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2022-03-03 15:32:25
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-03-03 20:16:01
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
    })
    let num = 0
    watchEffect((onInvalidate)=>{
      num++
      console.log('执行次数',num,toal.value)
      toal.value = product.price *  product.count
      onInvalidate(()=>{
        console.log('watchEffect重新运行了')//会在重新运行时或者停止时先执行
      })
    })



    return {
      // card1
      toal,
      product
      // 
    }
  }