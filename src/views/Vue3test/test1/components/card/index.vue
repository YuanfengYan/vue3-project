<template>
<div  @click="handle" v-bind="$attrs">
  <button >点击按钮</button>
</div>
</template>
<script>
export default {
  inheritAttrs: false,
  setup(props,context){
    const handle = function(){
      console.log('子组件click',context)
      context.emit('myclick','通知父组件')
    }
    return{
      handle
    }
  }
}
</script>