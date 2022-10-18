<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: YuanfengYan yanyuanfeng_sspu@163.com
 * @LastEditTime: 2022-09-02 18:09:54
-->
<template>
  <div class="">
    <div>我是toal:{{ toal }}</div>
    <div>我是price {{ $t("message.loginTip") }} :{{ product.price }}</div>
    <div class="" @click="changeLange">语言切换</div>
    <MyVueElement></MyVueElement>
  </div>
</template>
<style lang="scss">
@import "./style.scss";
</style>
<script lang="ts">
// import { ElMessage } from 'element-plus'
import { reactive, ref, watchEffect, nextTick, defineCustomElement } from "vue";
// import { loginApi } from '@/api/user';
import { useI18n } from "vue-i18n";
import { add, loggingIdentity } from "./tsindex";

export default {
  setup() {
    const { locale } = useI18n();
    const MyVueElement = /*#__PURE__*/ defineCustomElement({
      /* 组件选项 */
    });
    let toal = ref(1);
    let product = reactive({
      price: 10,
      count: 2,
    });
    setTimeout(() => {
      toal.value++;
      product.price++;
      //  当同步修改多个watchEffect中的依赖，watchEffect只会执行一次，在nextTick中执行，就会分两次执行watchEffect
      nextTick(() => {
        product.count++;
      });
    });
    let num = 0;
    watchEffect(() => {
      num++;
      console.log("执行次数", num, toal.value);
      toal.value = product.price * product.count;
    });
    const changeLange = function () {
      locale.value == "en" ? (locale.value = "zh") : (locale.value = "en");
    };

    const fn1 = add;
    console.log(fn1(1, 1));
    console.log(fn1("1", "1"));
    loggingIdentity([]);

    return {
      toal,
      product,
      MyVueElement,
      changeLange,
    };
  },
};
</script>
