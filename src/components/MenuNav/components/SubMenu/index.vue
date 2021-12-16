<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-12-13 16:09:03
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-16 15:01:08
-->
<template>
      <el-sub-menu :index="item.path">
          <template #title>
            <el-icon class="icon" size="25" ><component :is="item?.meta?.icon"></component></el-icon>
            <span class="des" v-if="item?.meta">{{item?.meta?.title}}</span>
          </template>
            <slot />
      </el-sub-menu>
</template>
<style lang="scss" scoped>
@import "./style.scss";
.icon{
  margin-bottom: 10px;
  margin-right: 10px;
}
.des{
  width: 150px;
  display: inline-block;
}
</style>
<script lang="ts">

// import { ElMessage } from 'element-plus'
import { defineComponent, PropType } from 'vue';
// import WarpMenu from "@/components/MenuNav/components/WarpMenu/index.vue"
interface Item {
  path: string;
  title: string;
  hidden: boolean;
  meta:any;
  children?:Item[];
  notShowChildren?:boolean;
  alwaysShow?:boolean
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
