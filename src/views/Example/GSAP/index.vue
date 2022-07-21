<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-07-21 18:35:42
-->
<template>
    <div class="pagewarp">
        <!-- <remote-js src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js"></remote-js> -->
          <el-button @click="ani1Fn1">动画1</el-button>
          <el-button @click="anipauseFn2">动画1暂停</el-button>
          <el-button @click="aniplayFn">动画1继续</el-button>
          <el-button @click="anirestFn">动画1重置</el-button>
        <div class="ani">1234</div>
        <div class="ani">1234</div>
        <div class="ani">1234</div>
         <el-card >
          文档介绍地址：https://greensock.com/docs/v3/GSAP/Tween

          <p></p>
         </el-card>
    </div>
</template>
<style lang="scss" scoped>
@import './style.scss';
</style>
<script lang="ts">

import { defineComponent } from 'vue';
import { gsap } from "gsap";
export default defineComponent({
    data() {

      let tween1 :any={}
        return {
          tween1
        };
    },
    components:{
      // 'remote-js': {
      //       render() {
      //         return h('script', { type: 'text/javascript', src: this.src });            
      //       },
      //       props: {
      //         src: { type: String, required: true },
      //       },
      //   },
    },
    methods: {
      ani1Fn1(){
        this.tween1 = gsap.to('.ani', {duration:3,rotation:720,x:30,y:function(index, target, targets) { //function-based value
        console.log(target,targets)
        return index * 50; 
    },})
        this.tween1.then(()=>{
          console.log('完成了')
        })
      },
      anipauseFn2(){
        console.log(this.tween1)
        window['a'] = this.tween1
        this.tween1.pause()
      },
      aniplayFn(){
        this.tween1.play()
      },
      anirestFn(){
        this.tween1.restart()
      }
    },
    created() {},
    mounted() {},
    unmounted() {},
    setup() {},
});
</script>
