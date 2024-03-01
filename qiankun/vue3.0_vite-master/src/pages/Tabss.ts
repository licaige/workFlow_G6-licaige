import { defineComponent ,createVNode,h} from "vue"

export default defineComponent({
  data() {
    return {
      name:'slots',
      slots:null
    }
  },
  props:['params'],
  methods: {},
  mounted(){},
  //可以使用 createVNode  也可以使用 render
  // setup(props:any, ctx:any) {
  //   return () => {
  //     console.log(props, ctx);
  //     return createVNode('div',{'style':'color:blue'},'hihihi')
  //   }
  // }
  render(props:any, ctx:any) {
    console.log('孙子',props,ctx,this);
    return h('div',{'style':'color:blue',onClick:()=>{this.$emit('EmitEvent1')}},[props.$slots.default(),props.$slots.bbb('slots 穿参')]);
    //return createVNode('div',{'style':'color:blue'},'hihihi')
  }
})

