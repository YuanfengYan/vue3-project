<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-11-03 14:56:43
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-16 15:06:00
-->
<template>
    <div class="slide" >
        <MenuNav :isCollapse="isCollapse"></MenuNav>
    </div>
</template>
<style lang="scss" >
@import "./style.scss";
.slide{
  width: 100%;
  height: 100%;
  background: #f5f7fa;
}
</style>
<script lang="ts">

import MenuNav from "@/components/MenuNav/index.vue"
export default {
  components:{
    MenuNav
  },
  computed:{
   
  },
  props:{
    isCollapse:{
      type: Boolean,
      default:false,
    }
  },
  data(){
    return {
    }
  },
  mounted(){
  },
  methods:{
    
  }
}
</script>