<template>
  <transition name="dv-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="state.loading"
      :style="{ backgroundColor: background || '' }"
      :class="[ns.b('mask'), customClass, ns.is('fullscreen', fullscreen)]"
    >
      <div :class="ns.b('spinner')">
        <svg v-if="!spinner" class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none" />
        </svg>
        <i v-else :class="spinner"></i>

        <p v-if="text" :class="ns.b('text')">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from "vue";
import { useNamespace } from "@/hooks/useNamespace";

const ns = useNamespace("loading");

const props = defineProps({
  text: String,
  spinner: String,
  background: String,
  fullscreen: Boolean,
  visible: Boolean,
  customClass: String,
});

const state = reactive({
  loading: false,
});

watchEffect(() => {
  state.loading = props.visible;
});

const close = () => {
  state.loading = false;
};

const emits = defineEmits(["destroy"]);

const handleAfterLeave = () => {
  emits("destroy");
};

defineExpose({
  close,
  visible: state.loading,
});
</script>
