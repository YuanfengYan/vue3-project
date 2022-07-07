<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-07-07 17:37:10
-->
<template>
    <div class="">
     1234
    </div>
</template>
<style lang="scss" >
@import "./style.scss";
</style>
<script lang="ts">
import Example from "@/views/Vue3test/OtherTest/decorator"
// import { ElMessage } from 'element-plus'
// import {reactive, ref,watchEffect,nextTick} from 'vue';
// import { loginApi } from '@/api/user';
export default {
  setup() {
     let example = new Example()
     console.log(example)
      
     example.a()
     example.a()
     example.a()
     example.a2()
     example.a2()
     example.a2()
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
