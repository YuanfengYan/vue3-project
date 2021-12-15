<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-11-03 14:56:43
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-15 15:52:21
-->
<template>
    <div class="slide" >
        <MenuNav></MenuNav>
        <!-- <el-menu
          default-active="1"
          class="menu"
          mode="vertical"
        >
          <el-sub-menu v-for="(item,index) in [1,2,3]" :key="index"  :index="index" >
            <template #title>
              <span>item1</span>
            </template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item one</el-menu-item>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu> -->

    </div>
</template>
<style lang="scss" >
@import "./style.scss";
.slide{
  width: 100%;
  height: 100%;
  background: #99ffff;
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
    menus:{
      type: Array,
      default:()=>{
        return [1,2,3]
      }
    }
  },
  data(){
    return {
      showflag:true,
    }
  },
  mounted(){
    // console.log(this)
  },
  methods:{
    
  }
}
</script>