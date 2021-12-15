<!--
 * @Description: 菜单组件 （基于element-plus的el-menu封装）依赖于route数组
 * @Author: yanyuanfeng
 * @Date: 2021-11-10 10:47:13
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-15 14:28:09
-->
<template>
    <el-menu
    mode="vertical"
    :collapse="isCollapse"
    >
      <template v-for="item in routes" :key="item.path" >
        <Warp-Menu :item="item" :base-path="item.path" :index="item.path"></Warp-Menu>
      </template>
    </el-menu>
</template>
<style lang="scss" >
@import "./style.scss";
</style>
<script lang="ts">

import { defineComponent } from 'vue';
import WarpMenu from "@/components/MenuNav/components/WarpMenu/index.vue"
import {mapGetters} from "vuex"
export default defineComponent({

    data() {
        return {
        };
    },
    props:{
      // 是否展开菜单
      isCollapse:{
        type: Boolean,
        default: false
      },
    },
    components:{
      WarpMenu
    },
    computed:{
      // 获取当前权限下的路由数组
      ...mapGetters({
        routes: 'router/routes',
      }),
    },
    methods: {
    },
    created(){

    },
    mounted(){

    },
    unmounted(){

    },
    setup() {},
});
</script>
