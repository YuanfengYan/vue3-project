

//@ts-nocheck
import { h } from 'vue'

function hoc(comp, req){
  return {
    //默认情况下，父组件传递的，但没有被子组件解析为 props 的 attributes 绑定会被“透传”。这意味着当我们有一个单根节点的子组件时，这些绑定会被作为一个常规的 HTML attribute 应用在子组件的根节点元素上。
    inheritAttrs:false, //所以我们可以通过设置 inheritAttrs 为 false 来禁用这个默认行为。

    data() {
      return {
        result:'',
        loading:true,
        err:false,
      }
    },
    methods:{
      async requestInfo(){
        this.loading = true
        const { requestParams } = this.$refs.base
        console.log("请求参数:",requestParams)
        const result =  await req(requestParams).finally(()=>{
          console.log('???')
          this.loading = false
        })
        this.result = result
        console.log(this.result)
      }
    },
    async mounted() {
      console.log(this.$attrs,this.$slots)
      this.$refs.base.$watch('requestParams',()=>{
        this.requestInfo()
      },{
        immediate:true,
        deep:true
      })
    },
    render() {
      return h('div',[
        h(comp,{result:this.result,ref: 'base',...this.$attrs},this.$slots),
        this.loading?h('div',["加载中"]):null,
        this.err?h('div',["加载失败"]):null,
      ])
    },
  }
}
export default hoc