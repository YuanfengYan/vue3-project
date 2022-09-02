<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: YuanfengYan yanyuanfeng_sspu@163.com
 * @LastEditTime: 2022-09-01 16:55:51
-->
<template>
  <div class="box">
    <el-card class="box-card" @click="example.a">
      装饰器（decorator.ts）进行防抖等功能
    </el-card>

    <div class="box-card">
      自定义插件-拖拽
      <div class="drag" v-my-drag>拖拽对象</div>
    </div>
    <div class="box-card">生命周期测试{{ name }}</div>
    <div class="box-card">
      app.provide({string | Symbol} key, value)变量注入{{ user }}
    </div>
    <div class="box-card">
      cssmodule
      <div :class="classes.rr">red{{ classes }}</div>
      <div class="box1"><span :class="classes.bluef">blue</span></div>
    </div>
    <div class="box-card" @click="changData">renderTracked{{ age }}</div>
    <div class="box-card" @click="changtoRaw">
      toRaw:地址：{{ obj1.addr }} 年龄：{{ obj1.person.age }} 电话：{{ obj1.info.phone }}
    </div>
  </div>
</template>
<style lang="scss">
@import "./style.scss";
</style>
<style module="classes">
.rr {
  color: red;
}
.box1 {
}
.bluef {
  color: blue;
}
</style>
<script lang="ts">
interface Data {
  [key: string]: unknown;
}

import Example from "@/views/Vue3test/OtherTest/decorator";
import { reactive, toRaw, version, markRaw, onUpdated } from "vue";
// import { toRaw} from '@vue/reactivity'
// const HelloWorld2:any = defineComponent(function HelloWorld2() {
//   // const count = ref(11)
//    const HelloWorld = resolveComponent('HelloWorld')
//    console.log('HelloWorld',HelloWorld)
//   return HelloWorld
// })

// import { ElMessage } from 'element-plus'
// import {reactive, ref,watchEffect,nextTick} from 'vue';
// import { loginApi } from '@/api/user';
export default {
  inject: ["user"],

  data: (): Data => {
    return {
      name: "xxx",
      age: 2,
    };
  },
  // 此事件告诉你是什么操作触发了重新渲染，以及该操作的目标对象和键。
  renderTriggered(e: any) {
    console.log(e);
  },
  beforeCreate() {
    console.log("触发了beforeCreate钩子函数");
  },
  created() {
    console.log("触发了created钩子函数");
    this["$data"].name = "222"; //在这修改data不会触发beforeUpdate
  },
  beforeMount() {
    console.log("触发了beforeMount钩子函数");
    this["$data"].name = "333"; //在这修改data不会触发beforeUpdate
  },
  mounted() {
    console.log("触发了mounted钩子函数");
    console.log("version", version);
    this["$data"].name = "222"; //在这修改data会触发beforeUpdate 需要注意的是该data是在页面中绑定使用的
  },
  beforeUpdate() {
    console.log("触发了beforeUpdate钩子函数");
  },
  updated() {
    console.log("触发了Updated钩子函数");
  },
  beforeUnmount() {
    console.log("触发了beforeDestroy钩子函数");
  },
  unmounted() {
    console.log("触发了destroyed钩子函数");
  },
  methods: {
    changData(): void {
      this["$data"].name += "h";
    },
  },
  setup() {
    let example = new Example();
    console.log(example);
    onUpdated(() => {
      console.log("父组件更新了");
    });
    example.a();
    example.a();
    example.a();
    example.a2();
    example.a2();
    example.a2();

    let obj1 = reactive({
      addr: "浙江新昌",
      person: markRaw({
        name: "YAN",
        age: "29",
      }),
      info: {
        phone: "15990xxxx",
      },
    });
    let obj2 = toRaw(obj1);

    //  let obj2 = toRaw({
    //     phone:"15990xxxx"
    //   })
    const changtoRaw = function () {
      obj2.person.age += "1"; //toRaw
      obj1.person.age += "1"; //markRaw
      obj1.addr += "2"; //reactive
      obj2.info["phone"] += "Y";
      console.log(obj2);
    };
    return {
      example,
      obj1,
      changtoRaw,
    };
  },
};
</script>
