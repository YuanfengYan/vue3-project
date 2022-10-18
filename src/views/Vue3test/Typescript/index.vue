<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-08-30 17:06:52
-->

<template>
  <div class="pagewarp">1222</div>
</template>
<style lang="scss" scoped>
@import "./style.scss";
</style>

<script lang="ts">
//  <reference path="./tool/vaild1.ts" />
//  <reference path="./tool/vaild2.ts" />
//  <reference path="./tool/vaild3.ts" />
import { Valid } from "./tool/vaild2";

// import { ElMessage } from 'element-plus'
import { defineComponent } from "vue";
// import { loginApi } from '@/api/user';

export default defineComponent({
  setup() {
    const mycolor1: Valid.MyColor1 = new Valid.MyColor1();

    console.log("222", mycolor1.getname());

    return {};
  },
});
</script>
