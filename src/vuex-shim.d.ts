// vuex.d.ts
// import { ComponentCustomProperties } from 'vue'
// import { Store } from 'vuex'

// declare module '@vue/runtime-core' {
//   // 声明自己的 store state
//   interface State {
//     isLogin: boolean;
//     userName?: string;
//     count:number;
//   }

//   // 为 `this.$store` 提供类型声明
//   interface ComponentCustomProperties {
//     $store: Store<State>
//   }
// }
declare let $store: any