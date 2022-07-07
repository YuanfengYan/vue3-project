<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-07-05 17:02:59
-->
<template>
    <div class="cc">
      <div class="avatar" v-html="avatarSvg"></div>
     <el-input v-model="input" @change="creatAvatar(input)" placeholder="Please input" />
    </div>
    <div class="qrcode">
        <qrcode-vue foreground="green" background="red" value="https://www.baidu.com" :size="300" level="H" />
    </div>
</template>
<style lang="scss" >
@import "./style.scss";
</style>
<script lang="ts">

import { defineComponent,ref } from 'vue';
import svgAvatarCreate from '@/utils/svgAvatar';
import QrcodeVue from 'qrcode.vue'
export default defineComponent({
    data() {
        return {
          input:''
        };
    },
   components: {
      QrcodeVue,
    },

    methods: {
    },
    created(){

    },
    mounted(){

    },
    unmounted(){

    },
    setup() {
      let avatarSvg = ref('')
      const creatAvatar = function(str:string|number){
        avatarSvg.value = svgAvatarCreate(str+'')
      }
      creatAvatar('aa')
      return {
        avatarSvg,
        creatAvatar,

      }

    },
});
</script>
