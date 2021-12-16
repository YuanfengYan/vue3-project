<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-11-03 14:56:43
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-16 15:13:54
-->
<template>
   <div class="header">
     <div class="expand">
      <slot name="expand" ></slot>
     </div>
   </div>
</template>
<style lang="scss" scoped>
@import "./style.scss";
.header{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #1890ff;
}
.expand{
  width: 50px;
  height: 100%;
  vertical-align: middle;
}
</style>
<script lang="ts" >
// import {ref} from "vue"
// import ModalDemo from "@/components/Modal/ModalDemo/ModalDemo.vue"
export default {
  components:{
    
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