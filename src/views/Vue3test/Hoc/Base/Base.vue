<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2022-08-10 14:03:19
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-08-10 20:08:43
-->

<template>
  <div>
    <p>这是木偶组件/ui组件</p>

    <slot name="Header"></slot>

    <div>name:{{result&&result.name}}</div>

    <slot :result="result" name="Body"></slot>

    <div>author:{{result&&result.author}}</div>

    <div @click="reRequest">点击重新请求</div>
  </div>
</template>
<script >
import {defineComponent} from "vue"

export default defineComponent({
  data(){
    return {
      requestParams:{
        id:1,
      }
    }
  },
  props:{
    // loading:{
    //   type:Boolean,
    //   default:true
    // },
    // err:{
    //   type:Boolean,
    //   default:false
    // },
    result:null,

  },
  methods:{
    reRequest(){
      console.log(11)
      this.requestParams.id++
      this.$emit('change',this.result.name)
    }
  }
})
</script>