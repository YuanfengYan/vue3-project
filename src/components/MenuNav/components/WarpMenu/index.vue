<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-12-13 16:09:03
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-13 20:18:38
-->
<template>
     <component v-if="!item.hidden" :is="menuComponent" :item="item" :child="routeChildren">
         <template v-if="item.children && item.children.length">
          <WarpMenu
            v-for="route in item.children"
            :key="route.path"
            :item="route"
          />
        </template>
      </component>
</template>
<style lang="scss" >
@import "./style.scss";
</style>
<script lang="ts">
import SubMenu from "@/components/MenuNav/components/SubMenu/index.vue"
import ItemMenu from "@/components/MenuNav/components/ItemMenu/index.vue"

// import { ElMessage } from 'element-plus'
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
// import { loginApi } from '@/api/user';
export default defineComponent({

    name:"WarpMenu",

    data() {
        return {
          routeChildren:null as Item | null,
        };
    },
    props:{
      item:{
        type: Object as PropType<Item>,
        required:true
      }
    },

    components:{
      SubMenu,
      ItemMenu
    },

    computed:{
      // 计算组件类型是显示ItemMenu (不含子集或只显示有且只有一个子集且子集再无子集) 、SubMenu (含有子集且要显示)
      menuComponent() {
        if (
          this.handleChildren(this.item.children, this.item) &&
          (!this.routeChildren?.children ||
            this.routeChildren?.notShowChildren) &&
          !this.item.alwaysShow
        ) {
          return 'ItemMenu'
        } else {
          return 'SubMenu'
        }
      },
    },
    methods: {
      // 返回是true 有且不止一个子集需要显示  ，否则返回false
      // routeChildren 在后续中有用的(当有且仅有一个子集需要显示时)
       handleChildren(children:Item[] = [], parent:Item) {
        // @ts-ignore
        //  debugger
        if (children === null) children = []
        const showChildren = children.filter((item:Item) => {
          if (item.hidden) {
            return false
          } else {
             this.routeChildren = item
            return true
          }
        })
        if (showChildren.length === 1) {
          return true
        }

        if (showChildren.length === 0) {
          this.routeChildren = {
            ...parent,
            // path: '',
            notShowChildren: true,
          }
          return true
        }
        return false
      },
    },
    created(){

    },
    mounted(){
      console.log(this.item)
    },
    unmounted(){

    },
    setup() {},
});
</script>
