
<template>
 <div class="vfwarp">
    <slot v-bind:item="list[0]">
      {{ list[0] }}
    </slot>

    <v-for
      v-if="list.length > 1"
      :list="list.slice(1)"
    >
      <template v-slot="{item}">
        <slot v-bind:item="item" />
      </template>
    </v-for>
  </div>
</template>
<style lang="scss" scoped>
@import "./style.scss";
</style>
<script lang="ts">

// import { ElMessage } from 'element-plus'
import { defineComponent } from "vue";
// import { loginApi } from '@/api/user';
export default defineComponent({
  name: "VFor",
  props:{
    list:{
      type:Array,
      default:()=>{
        return []
      }
    },
  },
  // setup(props,{ attrs, slots, emit, expose }) {
  // },
});
</script>
