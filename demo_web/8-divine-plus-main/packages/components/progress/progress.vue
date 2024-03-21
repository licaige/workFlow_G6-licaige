<template>
  <div
    :class="[
      ns.b(),
      ns.m(type),
      ns.is(status),
      {
        [ns.m('without-text')]: !showText,
        [ns.m('text-inside')]: textInside,
      },
    ]"
  >
    <!-- 1. line -->
    <div :class="ns.b('bar')" v-if="isLineType">
      <div
        :class="ns.be('bar', 'outer')"
        :style="{ height: strokeWidth + 'px' }"
      >
        <div :class="ns.be('bar', 'inner')" :style="barStyle">
          <div :class="ns.be('bar', 'innerText')" v-if="showText && textInside">
            {{ content }}
          </div>
        </div>
      </div>
    </div>

    <div
      :class="ns.b('circle')"
      :style="{
        height: props.circleWidth + 'px',
        width: props.circleWidth + 'px',
      }"
      v-else
    >
      <svg viewBox="0 0 100 100">
        <path
          :class="ns.be('circle', 'track')"
          :d="trackPath"
          :stroke="backColor"
          :stroke-width="relativeStrokeWidth"
          fill="none"
          :style="trailPathStyle"
        ></path>
        <path
          :class="ns.be('circle', 'path')"
          :d="trackPath"
          :stroke="stroke"
          fill="none"
          :stroke-linecap="strokeLinecap"
          :stroke-width="percent ? relativeStrokeWidth : 0"
          :style="circlePathStyle"
        ></path>
      </svg>
    </div>

    <!-- 1. line 末尾 text -->
    <div
      :class="[ns.e('text'), ns.e('circle-text')]"
      v-if="showText && !textInside"
      :style="{ fontSize: progressTextSize + 'px', color: textColor }"
    >
      <span>{{ content }}</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "DvProgress",
};
</script>

<script setup lang="ts">
import { CSSProperties, computed } from "vue";
import { useNamespace } from "@/hooks/useNamespace";
import { isArray } from "./utils";
import type { TColor, TColorArray, TStatus, TType } from "./utils";

const ns = useNamespace("progress");

const props = defineProps({
  type: {
    type: String,
    default: "line",
    validator: (type: TType) => ["line", "circle", "dashboard"].includes(type),
  },
  percent: {
    type: [Number],
    default: 0,
    required: true,
    validator: (val: number | string) => Number(val) >= 0 && Number(val) <= 100,
  },
  strokeWidth: {
    type: Number,
    default: 6,
  },
  strokeLinecap: {
    type: String,
    default: "round",
  },
  circleWidth: {
    type: Number,
    default: 126,
  },
  status: {
    type: String,
    default: "",
  },
  color: {
    type: [String, Array, Function],
    default: "",
  },
  backColor: {
    type: String,
    default: "#e5e9f2",
  },
  textColor: {
    type: String,
  },
  showText: {
    type: Boolean,
    default: true,
  },
  textInside: {
    type: Boolean,
    default: false,
  },
  format: Function,
});

const isLineType = computed(() => props.type === "line");
const isCircle = computed(() => props.type === "circle");
const isDashboard = computed(() => props.type === "dashboard");

const barStyle = computed(() => {
  const style: CSSProperties = {};
  style.width = props.percent + "%";
  style.backgroundColor = getCurrentColor(props.percent);
  return style;
});

const content = computed(() => {
  if (typeof props.format === "function") {
    return props.format(props.percent) || "";
  } else {
    return `${props.percent}%`;
  }
});

const progressTextSize = computed(() => {
  return props.type === "line"
    ? 12 + props.strokeWidth * 0.4
    : 1 * 0.111111 + 2;
});

const getCurrentColor = (percent: number) => {
  if (typeof props.color === "function") {
    return props.color(percent);
  } else if (typeof props.color === "string") {
    return props.color;
  } else if (isArray(props.color)) {
    return getLevelColor(percent);
  } else {
    return "";
  }
};

const getLevelColor = (percent: number) => {
  const colorArray = getColorArray().sort(
    (a: TColor, b: TColor) => a.percent - b.percent
  );

  for (let i = 0; i < colorArray.length; i++) {
    if (colorArray[i].percent > percent) {
      return colorArray[i].color;
    }
  }

  return colorArray[colorArray.length - 1].color;
};

const getColorArray = () => {
  const color = props.color as TColorArray;
  const span = 100 / color.length;
  return color.map((currentColor: TColor, index: number) => {
    if (typeof currentColor === "string") {
      return {
        color: currentColor,
        percent: (index + 1) * span,
      };
    }
    return currentColor;
  });
};

const relativeStrokeWidth = computed(() => {
  // strokeWidth: 进度条的宽度，单位 px
  // circleWidth: 环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用）
  return ((props.strokeWidth / props.circleWidth) * 100).toFixed(1);
});

// 半径
const radius = computed(() => {
  if (isCircle.value || isDashboard.value) {
    return parseInt(String(50 - parseFloat(relativeStrokeWidth.value) / 2), 10);
  } else {
    return 0;
  }
});

const trackPath = computed(() => {
  const _radius = radius.value;
  const _isDashboard = isDashboard.value;
  return `
          M 50 50
          m 0 ${_isDashboard ? "" : "-"}${_radius}
          a ${_radius} ${_radius} 0 1 1 0 ${_isDashboard ? "-" : ""}${
    _radius * 2
  }
          a ${_radius} ${_radius} 0 1 1 0 ${_isDashboard ? "" : "-"}${
    _radius * 2
  }
          `;
});

const stroke = computed(() => {
  let ret;
  if (props.color) {
    ret = getCurrentColor(props.percent);
  } else {
    switch (props.status) {
      case "success":
        ret = "#13ce66";
        break;
      case "error":
        ret = "#ff4949";
        break;
      case "warning":
        ret = "#e6a23c";
        break;
      default:
        ret = "#20a0ff";
    }
  }

  return ret;
});

// 周长
const perimeter = computed(() => {
  return 2 * Math.PI * radius.value;
});

const rate = computed(() => {
  // dashboard 模式下 - 周长 = 3/4 总周长
  return isDashboard.value ? 0.75 : 1;
});

// 偏移
const strokeDashoffset = computed(() => {
  const offset = (-1 * perimeter.value * (1 - rate.value)) / 2;
  return `${offset}px`;
});

const circlePathStyle = computed(() => {
  return {
    strokeDasharray: `${
      perimeter.value * rate.value * (props.percent / 100)
    }px, ${perimeter.value}px`,
    strokeDashoffset: strokeDashoffset.value,
    transition: "stroke-dasharray 0.6s ease 0s, stroke 0.6s ease",
  };
});

const trailPathStyle = computed(() => {
  return {
    strokeDasharray: `${perimeter.value * rate.value}px, ${perimeter.value}px`,
    strokeDashoffset: strokeDashoffset.value,
  };
});
</script>
