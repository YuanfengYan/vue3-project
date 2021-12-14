<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-12-13 16:09:03
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-13 20:16:30
-->
<!--
 * @Description: 菜单组件 （基于element-plus的el-menu封装）依赖于route数组
 * @Author: yanyuanfeng
 * @Date: 2021-11-10 10:47:13
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-13 15:44:13
-->
<template>
     <el-menu-item :index="child.path" @click="handleLink">
        <span>{{ child?.meta?.title }}</span>
     </el-menu-item>
</template>
<style lang="scss" >
@import "./style.scss";
</style>
<script lang="ts">

// import { ElMessage } from 'element-plus'
import path from 'path'
import { defineComponent, PropType } from 'vue';
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
       child:{
        type: Object as PropType<Item>,
        required:true
      },
      basePath:{
        type: String,
        required:true
      },
    },
    computed:{
 
    },
    methods: {
      handleLink(){
        // console.log(this.child.path)
        // console.log('this.basePath',this.basePath)
        let goPage = path.resolve(this.basePath, this.child.path)
        // console.log(goPage)
        this.$router.push(goPage)
      }
    },
    created(){

    },
    mounted(){

    },
    unmounted(){

    },
    setup() {},
});
</script>
