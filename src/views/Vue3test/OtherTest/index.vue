<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-07-21 11:06:18
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
     <div class="box-card">
      生命周期测试{{name}}
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
  data:()=>{
    return{
      name:'xxx',
      age:2
    }
  },
  beforeCreate () {
    console.log('触发了beforeCreate钩子函数')
  },
created () {
    console.log('触发了created钩子函数')
     this['$data'].name = '222'//在这修改data不会触发beforeUpdate
  },
beforeMount () {
    console.log('触发了beforeMount钩子函数')
     this['$data'].name = '333' //在这修改data不会触发beforeUpdate
  },
mounted () {
    console.log('触发了mounted钩子函数')
     this['$data'].name = '222'//在这修改data会触发beforeUpdate 需要注意的是该data是在页面中绑定使用的
   
  },
beforeUpdate () {
    console.log('触发了beforeUpdate钩子函数')
  },
updated () {
    console.log('触发了Updated钩子函数')
  },
beforeUnmount () {
    console.log('触发了beforeDestroy钩子函数')
  },
unmounted () {
    console.log('触发了destroyed钩子函数')
  },

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
