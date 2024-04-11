<template>
  <div class="gant-panel">
    <div class="content-box">
      <div class="content">
        <div
          v-for="(item, index) in props.list"
          :key="index"
          class="gant-row"
          :style="`width: ${props.fullWidth}px`"
        >
          <div
            class="gant-item"
            :style="`left: ${dateToGap(
              item.startTime,
              'left',
              totalYear,
              0,
              props.fullWidth
            )}px; right: ${dateToGap(
              item.endTime,
              'right',
              totalYear,
              0,
              props.fullWidth
            )}px; background: ${props.color}`"
          ></div>
          <!-- @click="handleClick(item)" -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const totalYear = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029];

const props = defineProps({
  color: {
    type: String,
    default: "",
  },
  fullWidth: {
    type: Number,
    default: 0,
  },
  list: {
    type: Array,
    require: true,
  },
});

const dateToGap = (
  date,
  direction = "left",
  years,
  width,
  fullWidth
) => {
  years = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
  if (fullWidth) width = fullWidth / years.length;
  let startYear = years[0];
  let endYear = years[years.length - 1];
  let gapMonth = 0;
  if (direction === "left") {
    let gapYear = new Date(date).getFullYear() - startYear;
    let month = new Date(date).getMonth();
    gapMonth = gapYear * 12 + month;
  } else {
    let gapYear = endYear - new Date(date).getFullYear() + 1; // 9
    let month = new Date(date).getMonth() + 1; // 3
    gapMonth = gapYear * 12 - month;
  }

  return (width * gapMonth) / 12;
};
</script>

<script>
export default {
  name: "GantPanel",
};
</script>

<style lang="less" scoped>
.gant-panel {
  --line-height: 28px;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  max-height: 100%;
  overflow: hidden;

  .content-box {
    flex: 1;
    overflow: hidden;
    margin-bottom: 0;
    .content {
      display: flex;
      flex-flow: column nowrap;
      position: relative;
      overflow: auto;
      .gant-row {
        --len: 10;
        min-width: var(--min-width);
        height: 22px;
        margin: 0;
        position: relative;
        .gant-item {
          --start: 0;
          --end: 0;
          display: inline-block;
          height: 100%;
          position: absolute;
          left: calc(var(--start) / var(--len) * 100%);
          right: calc(var(--end) / var(--len) * 100%);
          border-radius: 4px;
        }
      }
    }
  }
}
</style>