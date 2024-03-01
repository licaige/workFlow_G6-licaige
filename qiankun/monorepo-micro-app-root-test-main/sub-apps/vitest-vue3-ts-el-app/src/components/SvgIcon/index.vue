<script setup lang="ts">
import { computed, type CSSProperties} from 'vue';

const props = defineProps({
  classes: {
    type: String,
    default: '',
  },
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#333'
  },
  size: {
    type: String,
    default: '1em'
  },
  spin: {
    type: Boolean,
    default: false
  },
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`);

const svgClass = computed(() => {
  if (props.classes) {
    return `svg-icon ${props.classes}`;
  }
  return 'svg-icon';
});

const getStyle = computed((): CSSProperties => {
  const { size } = props
  let s = `${size}`
  s = `${s.replace('px', '')}px`
  return {
    fontSize: s,
  }
});
</script>

<template>
  <i :class="[svgClass, props.spin && 'svg-icon-spin']" :style="getStyle">
    <svg aria-hidden="true" :width="props.size" :height="props.size" v-bind="$attrs">
      <use :xlink:href="symbolId" :fill="props.color"/>
    </svg>
  </i>
</template>

<style scoped lang="scss">
  .svg-icon {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    
    width: 1em;
    height: 1em;
    line-height: 1em;
    font-size: inherit;
    --color: inherit;
    color: var(--color);
    fill: currentColor;

    svg {
      width: 1em;
      height: 1em;
    }

    &-external {
      background-color: currentColor;
      mask-size: cover !important;
      // display: inline-block;
    }
  }

  .svg-icon-spin {
    animation: circle 1.5s infinite linear;
  }

  /* 旋转动画 */
  @keyframes circle {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>