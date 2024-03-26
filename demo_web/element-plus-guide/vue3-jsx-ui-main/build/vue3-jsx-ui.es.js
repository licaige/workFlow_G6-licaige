import { defineComponent, toRefs, createVNode } from "vue";
const buttonProps = {
  type: {
    type: String,
    default: "secondary"
  },
  size: {
    type: String,
    default: "medium"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  }
};
var Button = defineComponent({
  name: "CButton",
  props: buttonProps,
  setup(props, {
    slots
  }) {
    const {
      type,
      size,
      disabled,
      block
    } = toRefs(props);
    const blockClass = block.value ? "c-btn--block" : "";
    return () => {
      const defaultSlot = slots.default ? slots.default() : "\u6309\u94AE";
      return createVNode("button", {
        "disabled": disabled.value,
        "class": `c-btn c-btn--${type.value} c-btn--${size.value} ${blockClass}`
      }, [defaultSlot]);
    };
  }
});
var ButtonPlugin = {
  install(app) {
    app.component(Button.name, Button);
  }
};
const installs = [ButtonPlugin];
var entry = {
  install(app) {
    installs.forEach((p) => app.use(p));
  }
};
export { Button, entry as default };
