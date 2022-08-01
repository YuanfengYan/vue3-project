<template>
<div  @click="handle" v-bind="$attrs">
  <button >点击按钮</button>
  <div>cardCount:{{cardCount}}</div>
  <div>user:{{user}}</div>
</div>
</template>
<script>
import {ref,inject} from "vue"
export default {
  inheritAttrs: false,
  
  setup(props,context){
    const user = inject("user")
    let cardCount = ref(1)
    const handle = function(){
      console.log('子组件click',context)
      context.emit('myclick','通知父组件')
    }
    // 这个对于通过 r e f s 、 refs、refs、parent 或 $root 访问到的公共实例
    // 如果设置了，只能访问到设置的
    context.expose({
          cardCount,
      })
    return{
      handle,
      cardCount,
      user
    }
  }
}
</script>