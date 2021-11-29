<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-11-03 14:56:43
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-11-12 14:56:19
-->
<template>
    <el-container direction="horizontal">
      <el-aside>
        <SlidNav></SlidNav>
      </el-aside>
      <el-main>
        <el-container direction="vertical">
           <el-header height="60px" padding="0px">
              <Header></Header>
            </el-header>
          <el-main>
            <router-view  class="app-main-height" />
          </el-main>
        </el-container>
      </el-main>
    </el-container>
</template>
<style lang="scss" >
@import "./style.scss";
.el-container{
  /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
      /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
  .el-main,.el-aside,.el-header{
    padding: 0px;
  }
}

</style>
<script lang="ts">
// import {ref} from "vue"
import Header from "@/views/Layout/Header/index.vue"
import SlidNav from "@/views/Layout/SlidNav/index.vue"
export default {
  components:{
    Header,
    SlidNav
  },
  data(){
    return {
      showflag:true,
    }
  },
  methods:{
    
  }
}
</script>