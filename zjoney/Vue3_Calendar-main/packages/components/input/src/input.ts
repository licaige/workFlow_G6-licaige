// 定义input所需要的属性

import { ExtractPropTypes, PropType } from "vue";
import {isString} from '@vue/shared'

// type属性 默认就是text
// modelValue / v-model = modelValue + @update:modelValue
// placeholder 默认展示的内容
// clearable 清空输入框的内容
// show-password
// disabled
// readonly
// label 标签的内容

export const inputProps = {
  type:{
    type:String,
    default:'text'
  },
  modelValue:{
    type: [Number,String] as PropType<string | number>,
    default:''
  },
  placeholder:{
    type:String,
  },
  clearable:{
    type:Boolean
  },
  showPassword:{type:Boolean,default:false},
  disabled:{
    type:Boolean,
    default:false
  },
  readonly:{
    type:Boolean,
    default:false
  },
  label:{
    type:String
  }
} as const 

export  type InputProps = ExtractPropTypes<typeof inputProps>


export const inputEmits = {
  'update:modelValue':(value:string) => isString(value),
  input: (value:string) =>  isString(value),
  change: (value:string) =>  isString(value),
  focus:(e:FocusEvent) => e instanceof FocusEvent,
  blur:(e:FocusEvent) => e instanceof FocusEvent,
  clear:()=> true // 清空事件
}

export type InputEmits = typeof inputEmits