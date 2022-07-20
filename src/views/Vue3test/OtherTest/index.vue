<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-07-20 18:51:55
-->
<template>
    <div class="box">
     <el-card class="box-card" @click="example.a">
        装饰器（decorator.ts）进行防抖等功能
     </el-card>

      <div class="box-card" >
        自定义插件-拖拽
        <div class="drag" v-my-drag>拖拽对象</div>
     </div>
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
     return {
      example
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
