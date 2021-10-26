<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-10-26 18:45:10
-->
<template>
  <div>home - {{name}}</div>
</template>
<style scoped>

</style>
<script>
import {loginApi} from '@/api/user'
export default {
  data(){
    return {
      name:'xxx'
    }
  },
  created(){
    console.log('loginApi')
    loginApi().then(res=>{
      console.log('loginApi',res)
    })
  }
}
</script>