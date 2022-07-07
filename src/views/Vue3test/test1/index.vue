<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-07-07 15:16:59
-->
<template>
<div class="ccc">1</div>
    <div class="test1">
      <el-card class="box-card">
        <div class="tip">1、watchEffect:执行时机，使用方法</div>
        <div>我是toal:{{toal}}</div>
        <div>我是price:{{product.price}}</div>
      </el-card>
       <el-card class="box-card">
        <div class="tip">2、属性绑定：</div>
        <Card @click="handleClick" class="xxx" name="12" @myclick="subHandle"></Card>
      </el-card>
      <input type="text" placeholder="请输入">
      <el-card class="box-card">
        teleport绑定到 Vue app 之外指定的DOM 中
        <div class="111"></div>
        <teleport to='body' >
          to='body'
        </teleport>
      </el-card>
    </div>
</template>
<style lang="scss" >
@import "./style.scss";
</style>
<script lang="ts">

import testWacthEffect  from './watchEffect';
import Card from "./components/card/index.vue";
// import { ElMessage } from 'element-plus'
export default {
  components:{
    "Card":Card,
  },
  setup(){
    const {product,toal} = testWacthEffect()
    const handleClick = function(){
      console.log('父组件的clicked')
    }
    const subHandle = function(data:string){
      console.log('手动子组件的事件通知',data)
    }
    return {
      product,
      toal,
      // test2
      handleClick,
      subHandle,
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
