import { defineComponent, toRefs } from "vue";
import { buttonProps, ButtonProps } from "./button-types";
export default defineComponent({
    name: 'CButton',
    props: buttonProps,
    setup(props: ButtonProps, { slots }) {
        const { type, size, disabled, block } = toRefs(props)
        const blockClass = block.value ? 'c-btn--block' : ''
        return () => {
            const defaultSlot = slots.default ? slots.default() : '按钮'
            return <button 
                disabled={disabled.value} 
                class={`c-btn c-btn--${type.value} c-btn--${size.value} ${blockClass}`}>
                    {defaultSlot}
            </button>
        }
    }
})