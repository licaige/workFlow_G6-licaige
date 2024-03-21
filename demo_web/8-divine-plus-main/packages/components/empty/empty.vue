<template>
  <section :class="ns.b()">
    <div :class="ns.e('image')" :style="imageStyle">
      <img v-if="image" :src="image" ondragstart="return false" />
      <slot v-else name="image">
        <ImgEmpty />
      </slot>
    </div>

    <div :class="ns.e('description')">
      <slot v-if="$slots.description" name="description" />
      <p v-else>{{ emptyDescription }}</p>
    </div>

    <div v-if="$slots.default">
      <div :class="ns.e('bottom')">
        <slot />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "DvEmpty",
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import ImgEmpty from "./img-empty.vue";
import { useNamespace } from "@/hooks/useNamespace";

const ns = useNamespace("empty");

const props = defineProps({
  image: {
    type: String,
    default() {
      return "";
    },
  },
  imageSize: {
    type: Number,
  },
  description: {
    type: String,
    default() {
      return "";
    },
  },
});

const imageStyle = computed(() => ({
  width: props.imageSize ? `${props.imageSize}px` : "",
}));

const emptyDescription = computed(() => props.description);
</script>
