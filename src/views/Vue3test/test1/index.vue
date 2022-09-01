<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-08-16 15:56:50
-->
<template>
  <div class="test1">
    <el-card class="box-card">
      <div class="tip">1、watchEffect:执行时机，使用方法</div>
      <div>我是toal:{{ toal }}</div>
      <div v-if="cardMsg == 'cardMsg'">我是price:{{ product.price }}</div>
    </el-card>
    <el-card class="box-card">
      <div class="tip">2、属性绑定：{{cardMsg}}</div>
    </el-card>
      <Card ref="cardref" @click="handleClick" class="xxx" name="12" @myclick="subHandle"></Card>
    {{cardMsg}}

    <div class="warp">
      <p>Vue内置组件使用</p>
      <el-card class="box-card">
        teleport绑定到 Vue app 之外指定的DOM 中
        <div class="111"></div>
        <teleport to="body"> to='body' </teleport>
      </el-card>
      <el-card class="box-card">
        自定义tranlation
        <div
          style="
            border-radius: 10px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: blue;
          "
          @click="changetrans"
        >
          点击更改状态
        </div>
        <transition name="mytrans">
          <div v-if="showTransFlag" class="transContent">我是被tranlation包裹的内容</div>
        </transition>
      </el-card>
      <el-card class="box-card">
        自定义transition-group
        <div
          style="
            border-radius: 10px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: blue;
          "
          @click="changetransGroup"
        >
          点击更改状态
        </div>
        <transition-group name="mytransList" tag="div">
          <div class="list-item" v-for="item in list" :key="item">{{ item }}</div>
        </transition-group>
      </el-card>
    </div>
   <span>user:{{user}}</span>
  </div>
</template>
<style lang="scss">
@import "./style.scss";
</style>
<script lang="ts">
import testWacthEffect from "./watchEffect";
import Card from "./components/card/card.vue";
import { ref, reactive , onUpdated} from "vue";
export default {
  data(){
    return{
      name:'Yan',
      msg:"${this.name}"
    }
  },
  components: {
    Card: Card,
  },
  inject: ['user'],
  setup() {
    const { product, toal } = testWacthEffect();
    const showTransFlag = ref(true);
    const cardref = ref()
    let cardMsg = ref("cardMsg")
    console.log(cardMsg)
    setTimeout(()=>{
      cardMsg.value = "cardMsg改变了" 
    },5000)
    const handleClick = function () {
      console.log("父组件的clicked");
      console.log(cardref)
      cardref.value.cardCount++
      cardMsg.value+="cardMsg改变了" 
    };
    const subHandle = function (data: string) {
      console.log("手动子组件的事件通知", data);
    };
    // 过渡相关
    const changetrans = function () {
      showTransFlag.value = !showTransFlag.value;
    };
    const list = reactive([1, 66, 55, 44, 4, 43345, 2, 3, 4, 5]);
    const changetransGroup = function () {
      list.splice(0, 1);
    };
    onUpdated(()=>{
      console.log("父组件更新了")
    })
    return {
      product,
      toal,
      showTransFlag,
      list,
      changetransGroup,
      changetrans,
      handleClick,
      subHandle,
      cardref,
      cardMsg
    };
  },
};

</script>
