<!--
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 17:11:07
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-08-30 18:25:14
-->
<template>
    <div class="pagewarp">
      obj1:{{obj1.age}}
      count:{{count}}
      mycount:{{mycount}}
<div @click="inccount">Inc</div>
    </div>
</template>
<style lang="scss" scoped>
@import './style.scss';
</style>
<script>
// import { ElMessage } from 'element-plus'
import { defineComponent,reactive ,toRef} from 'vue';
// import { loginApi } from '@/api/user';

export default defineComponent({
    setup() {
      const myToRef = function(obj,key){
        const warp = {
          get value(){
            return obj[key]
          },
          set value(val){
            obj[key] = val
          }
        }
        Object.defineProperty(warp,"__v_isRef",{
          value:true,
        })
        return warp
      }
      const obj1 = reactive({
        name:"jack",
        age:18,
      })
      let count = toRef(obj1,'age')
      const inccount = function (){
        count.value++
      }
      const mycount = myToRef(obj1, 'age')
      return {
        count ,
        inccount,
        obj1,
        mycount
      }


    },
});
</script>
