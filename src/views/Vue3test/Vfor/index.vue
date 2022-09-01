<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-08-30 18:01:04
-->
<template>
  <div class="pagewarp">
    <v-for :list="list" />
    <v-for :list="list">
      <template v-slot="{item} ">
        <strong>{{ item }}</strong>
      </template>
    </v-for>
  </div>
</template>
<style lang="scss" scoped>
@import './style.scss';
</style>
<script lang="ts">
// import { ElMessage } from 'element-plus'
import { defineComponent } from 'vue';
// import { loginApi } from '@/api/user';
import VFor from './Vforcom/Vforcom.vue'

export default defineComponent({
    components:{
      VFor,
    },
    setup() {
      const list = ['name',"age","addr"]
      return {
        list
      }
    },
});
</script>
