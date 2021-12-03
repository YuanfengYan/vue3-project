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
import { Store } from 'vuex'
// import RootStateTypes from './store/interface'

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$store: Store<any>
	}
}

// Vuex@4.0.0-beta.1 is missing the typing for `useStore`. See https://github.com/vuejs/vuex/issues/1736
declare module "vuex" {
  function useStore<T = any>(key?: string): T
}