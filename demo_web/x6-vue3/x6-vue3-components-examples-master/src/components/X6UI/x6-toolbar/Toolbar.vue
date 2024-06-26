<template>
    <div :class="toolbarClassName">
        <div :class="`${baseCls}-content`">
            <div :class="`${baseCls}-content-inner`">
                <slot></slot>
            </div>
            <div v-if="slotExtra" :class="`${baseCls}-content-extras`">
                <slot name="extra">
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, toRefs, computed, provide, reactive, defineComponent } from 'vue'
export default defineComponent({
    name: 'Toolbar',
    props: {
        className: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: 'big',
            validator(value) {
                return ['big', 'small'].includes(value)
            }
        },
        hoverEffect: {
            type: Boolean,
            default: false
        },
        align: {
            type: String,
            default: 'left',
            validator(value) {
                return ['left', 'right'].includes(value)
            }
        },
        onClick: {
            type: Function,
            default() {
                return (name, value) => {}
            }
        }
    },
    setup(props, context) {
        let { className, size, hoverEffect, align, onClick } = toRefs(props)
        let prefixCls = ref('x6')
        let baseCls = ref(`${prefixCls.value}-toolbar`)
        let toolbarContext = reactive({
            baseCls: baseCls.value,
            click: onClick.value
        })
        provide('toolbarContext', toolbarContext)
        let toolbarClassName = computed(() => {
            return `${baseCls.value} ${className.value} 
            ${baseCls.value}-${size.value} 
            ${align.value === 'right' ? baseCls.value + '-align-right' : ''} 
            ${hoverEffect.value ? baseCls.value + '-hover-effect' : ''}
             `
        })
        let slotExtra = ref(!!context.slots.extra)
        return {
            slotExtra,
            prefixCls,
            baseCls,
            toolbarClassName
        }
    }
})
</script>
<style lang="scss">
@import '../theme-chalk/x6-toolbar.scss';
</style>