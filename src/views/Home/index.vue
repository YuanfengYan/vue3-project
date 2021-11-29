<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-11-19 18:45:57
-->
<template>
 <div>
   <h1>我是首页</h1>
   <div class="bu" @click="add">点击增加</div>
   <p>{{$store.state.demo.count}}</p>
   <p>{{count}}</p>
 </div>
</template>
<style lang="scss" >
@import "./style.scss";
</style>
<script lang="ts">
import { mapState,mapMutations } from 'vuex'
// import {ref} from "vue"
// import ModalDemo from "@/components/Modal/ModalDemo/ModalDemo.vue"
export default {
  name:"home",
  // components:{
  //   ModalDemo
  // },
  data(){
    return {
      showflag:true,
    }
  },
  computed:{

  // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState({
       count: (state:any) => {return state.count},
    })
  },
  methods:{
     ...mapMutations({
      add: 'demo/addCount' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  },
  mounted(){
    // console.log(this.$store)
  }
}
</script>
