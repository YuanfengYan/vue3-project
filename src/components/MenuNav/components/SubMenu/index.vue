<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-12-13 16:09:03
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-13 18:06:19
-->
<template>
      <el-sub-menu :index="item.path">
          <template #title>
            <span v-if="item.meta">{{item.meta.title}}</span>
          </template>
            <slot />
      </el-sub-menu>
</template>
<style lang="scss" >
@import "./style.scss";
</style>
<script lang="ts">

// import { ElMessage } from 'element-plus'
import { defineComponent, PropType } from 'vue';
// import WarpMenu from "@/components/MenuNav/components/WarpMenu/index.vue"
interface Item {
  path: string;
  title: string;
  hidden: boolean;
  children?:any[];
}
export default defineComponent({

    data() {
        return {
        };
    },
    props:{
      item:{
        type: Object as PropType<Item>,
        required:true
      },
      basePath:{
        type: String,
        required:true
      },
    },
    components:{
    },
    computed:{
 
    },
    methods: {
    },
    created(){

    },
    mounted(){
      // console.log('sub',this.item)

    },
    unmounted(){

    },
    setup() {},
});
</script>
