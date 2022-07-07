<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-07-07 16:51:27
-->
<template>
    <div class="">
      <div>我是toal:{{toal}}</div>
      <div>我是price:{{product.price}}</div>
    </div>
</template>
<style lang="scss" >
@import "./style.scss";
</style>
<script lang="ts">

// import { ElMessage } from 'element-plus'
import {reactive, ref,watchEffect,nextTick} from 'vue';
// import { loginApi } from '@/api/user';
export default {
  setup() {
      let toal = ref(1)
      let product = reactive({
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
      watchEffect(()=>{
        num++
        console.log('执行次数',num,toal.value)
        toal.value = product.price *  product.count
      })
      return {
        toal,
        product
      }
    }
}
// export default defineComponent({
//     data() {
//         return {
//         };
//     },
//     methods: {
//     },
//     created(){

//     },
//     mounted(){

//     },
//     unmounted(){

//     },
    
// });
</script>
