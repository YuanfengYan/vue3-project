<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-11-08 14:15:30
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-11-12 10:28:01
 * example <modal-demo @close="showflag = false" :show="showflag"></modal-demo>
-->
<template>
  <div class="modal_demo" v-if="show" >
    <h1 @click="closeModal">弹窗内容</h1>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
	name: 'ModalDemo',
  props: ['show'],
  emits: ['close'],
  setup(props,{emit}){
    const closeModal = ()=>{
      emit('close')
    }
    return {closeModal}
  }
})
</script>

<style scoped>

</style>

