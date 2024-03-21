<template>
  <transition
    name="dv-message"
    @before-leave="onClose"
    @after-leave="$emit('destroy', true)"
  >
    <section
      v-show="state.visible"
      :id="id"
      :class="[ns.b(), { [ns.m(type)]: type }, ns.is('show-close', showClose)]"
      :style="customStyle"
    >
      {{ message }}

      <DvIcon
        name="cuowu"
        v-if="showClose"
        @click="onCloseMessage"
        :class="ns.e('closeBtn')"
      />
    </section>
  </transition>
</template>

<script lang="ts">
export default {
  name: "DvMessage",
};
</script>

<script setup lang="ts">
import { onMounted, reactive, computed } from "vue";
import { useNamespace } from "@/hooks/useNamespace";
import { definePropType } from "../../utils/definePropType";
import { getLastOffset } from "./instances";
import type { CSSProperties } from "vue";
import DvIcon from "@/components/icon/icon.vue";

const ns = useNamespace("message");

const props = defineProps({
  message: String || Object,
  type: {
    type: definePropType<"primary" | "success" | "warning" | "danger" | "info">(
      String
    ),
    default() {
      return "danger";
    },
  },
  duration: {
    type: Number,
    default: 3000,
  },
  showClose: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: 1,
  },
  zIndex: {
    type: Number,
    default: 1,
  },
  offset: {
    type: Number,
    default: 16,
  },
  onClose: {
    type: definePropType<() => void>(Function),
    required: false,
  },
});

const state = reactive({
  visible: false,
  height: 0,
});

onMounted(() => {
  show();
  runTimer();
});

const lastOffset = computed<number>(() => getLastOffset(props.id));
const offset = computed<number>(() => props.offset + lastOffset.value);
const bottom = computed<number>(() => state.height + offset.value + 50);
const customStyle = computed<CSSProperties>(() => ({
  top: `${offset.value}px`,
  zIndex: props.zIndex,
}));

const show = () => (state.visible = true);
const close = () => (state.visible = false);

const runTimer = () => {
  if (!props.duration) return;
  setTimeout(() => {
    close();
  }, props.duration);
};

const onCloseMessage = close;

defineEmits(["destroy"]);

defineExpose({
  visible: state.visible,
  bottom,
  close,
});
</script>
