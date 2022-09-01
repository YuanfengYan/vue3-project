<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-08-30 17:59:29
-->
// @ts-noCheck
<template>
    <div class="pagewarp">
      <h3>高阶组件</h3>
      <BaseWarp age="12" @change="onChange">
        <template #Header>
          我是头部插槽 -- 欢迎使用slot
        </template>
         <template #Body="{result}">
          我是内容插槽 并解析了拿到组件插槽上对应的props值 - --{{result.des}}
        </template>
      </BaseWarp>
    </div>
</template>
<style lang="scss" scoped>
@import './style.scss';

</style>
<script lang="ts">
import { gethocInfo } from '@/api/other';
import hoc from './HocBase/HocBase'
import Base from './Base/Base.vue'
import { defineComponent } from 'vue';
const BaseWarp = hoc(Base,gethocInfo)
export default defineComponent({
    components:{
      BaseWarp
    },
    setup() {
      const onChange = function(e:any){
        console.log('父组件中拿到数据了',e)
      }
      return {
        onChange
      }
    },
});
</script>
