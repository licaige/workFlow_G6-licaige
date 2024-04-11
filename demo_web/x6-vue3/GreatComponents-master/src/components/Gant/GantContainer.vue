<template>
  <div class="gant-conatiner">
    <div class="left-top-box" style="border-right: 1px solid #5f98b1">
      <table border="1">
        <tr>
          <th
            v-for="(item, index) in columnsLeft"
            :key="index"
            :colspan="item.key == 'name' ? 3 : 1"
            :style="{
              borderRight: 0,
              height: '64px',
              borderLeftWidth: index > 0 ? 0 : '1px',
              width: item.width + 'px',
            }"
          >
            {{ item.title }}
          </th>
        </tr>
      </table>
    </div>
    <div
      :ref="(ref) => (scrollBox.leftBottomRef = ref)"
      class="left-bottom-box"
      style="margin-bottom: 4px; border-right: 1px solid #5f98b1"
    >
      <table border="1">
        <tr v-for="(item, index) in tableData" :key="item.name + index">
          <template v-if="'level2name' in item">
            <td
              v-if="getRow(index, 'level1name').isFirst"
              :rowspan="getRow(index, 'level1name').rowspan"
              class="title1"
              style="min-width: 115px; max-width: 100px; position: initial"
              @click="setHightLight(index)"
            >
              {{ item.level1name.replace(item.level1id, "") }}
            </td>
            <td
              v-if="getRow(index, 'level2name').isFirst"
              :rowspan="getRow(index, 'level2name').rowspan"
              class="title2"
              style="
                min-width: 110px;
                max-width: 100px;
                position: initial;
                left: 100px;
              "
            >
              {{ item.level2name.replace(item.level2id, "") }}
            </td>
            <td class="title3">
              {{ item.name.replace(item.level3id, "") }}
            </td>
          </template>
          <template v-else-if="'level1name' in item">
            <td
              v-if="getRow(index, 'level1name').isFirst"
              :rowspan="getRow(index, 'level1name').rowspan"
              :colspan="2"
              class="title1"
              style="
                min-width: 200px;
                max-width: 200px;
                position: initial;
                left: 0;
              "
              @click="setHightLight(index)"
            >
              {{ item.level1name.replace(item.level2id, "") }}
            </td>
            <td class="title3">{{ item.name.replace(item.level3id, "") }}</td>
          </template>
          <td
            v-else
            colspan="3"
            class="title1"
            @click="setHightLight(index, true)"
          >
            {{ item.name.replace(item.level1id, "") }}
          </td>
          <td
            style="min-width: 110px"
            :style="{
              borderBottom:
                index === tableData.length - 1 ? '1px solid #5f98b1' : 0,
            }"
          >
            {{ formatTime(item.startTime) }}
          </td>
          <td
            style="min-width: 110px"
            :style="{
              borderBottom:
                index === tableData.length - 1 ? '1px solid #5f98b1' : 0,
            }"
          >
            {{ formatTime(item.endTime) }}
          </td>
          <td
            style="min-width: 60px; color: #2cda62"
            :style="{
              borderBottom:
                index === tableData.length - 1 ? '1px solid #5f98b1' : 0,
            }"
          >
            {{ item.duration }}
          </td>
        </tr>
      </table>
    </div>
    <div :ref="(ref) => (scrollBox.rightTopRef = ref)" class="right-top-box">
      <table class="right-table" border="0">
        <tr>
          <th
            v-for="(item, index) in columnsTop"
            colspan="12"
            :key="index"
            :style="{ borderLeftWidth: index === 0 ? 0 : '1px' }"
          >
            {{ item.title }}
          </th>
        </tr>
        <tr>
          <th
            v-for="(i, index) in 120"
            :key="index"
            style="font-size: 14px"
            :style="{ borderLeftWidth: index === 0 ? 0 : '1px' }"
          >
            {{ i % 12 == 0 ? 12 : i % 12 }}
          </th>
        </tr>
      </table>
    </div>
    <div :ref="(ref) => (scrollBox.ref = ref)" class="right-bottom-box">
      <table class="right-table" border="0" style="position: relative">
        <div
          class="split-line"
          v-for="(i, index) in 119"
          :key="index"
          :style="{ left: index * 18 + 18 + 'px' }"
        ></div>
        <tr v-for="(item, index) in tableData" :key="item.name + index">
          <td colspan="120" style="padding-left: 0; z-index: 1; border: none">
            <GantPanel
              :list="[item]"
              :fullWidth="18 * 120"
              :color="'linear-gradient(270deg, #6effb9 0%, #2ce775 100%)'"
            ></GantPanel>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import GantPanel from "./GantPanel.vue";
import { formatTime } from "@/scripts/utils.js";
import { computed, watch, reactive, ref } from "vue";
const columnsTop = ref([
  { title: "第1年", key: "gant1" },
  { title: "第2年", key: "gant2" },
  { title: "第3年", key: "gant3" },
  { title: "第4年", key: "gant4" },
  { title: "第5年", key: "gant5" },
  { title: "第6年", key: "gant6" },
  { title: "第7年", key: "gant7" },
  { title: "第8年", key: "gant8" },
  { title: "第9年", key: "gant9" },
  { title: "第10年", key: "gant10" },
]);
const columnsLeft = ref([
  { title: "项目", key: "name", width: 460 },
  { title: "开始时间", key: "startTime", width: 120 },
  { title: "结束时间", key: "endTime", width: 120 },
  { title: "工期", key: "duration", width: 65 },
]);

const props = defineProps({
  list: {
    type: Array,
    require: true,
  },
});

const tableData = computed(() => {
  return props.list.reduce((t, v) => {
    if (v.childVo.length === 0) {
      t.push({
        ...v,
        level1id: v.id,
        name: v.name + v.id,
      });
    } else {
      v.childVo.forEach((n) => {
        if (n.childVo.length === 0) {
          t.push({
            ...n,
            name: n.name + n.id,
            level1id: v.id,
            level2id: n.id,
            level1name: v.name + v.id,
          });
        } else {
          t.push(
            ...n.childVo.map((k) => ({
              ...k,
              name: k.name + k.id,
              level1id: v.id,
              level2id: n.id,
              level3id: k.id,
              level1name: v.name + v.id,
              level2name: n.name + n.id,
            }))
          );
        }
      });
    }
    return t;
  }, []);
});

// 找到该row纵向合并数
const getRow = (index, key) => {
  let data = tableData.value;
  let first = data.findIndex((item) => item[key] == data[index][key]);
  let last = data.findLastIndex((item) => item[key] == data[index][key]);
  return { rowspan: last - first + 1, isFirst: index == first };
};

const setHightLight = (first, isOnly = false) => {
  document
    .querySelectorAll(".active-hightlight")
    .forEach((item) => item.classList.remove("active-hightlight"));
  if (scrollBox.active !== first) {
    scrollBox.active = first;
    let data = tableData.value;
    let last = data.findLastIndex(
      (item) => item.level1name == data[first].level1name
    );
    scrollBox.leftBottomRef.querySelectorAll("tr").forEach((item, i) => {
      if (isOnly && i == first) {
        item.classList.add("active-hightlight");
      }
      if (!isOnly && i >= first && i <= last) {
        item.classList.add("active-hightlight");
      }
    });
    scrollBox.ref.querySelectorAll("tr").forEach((item, i) => {
      if (isOnly && i == first) {
        item.classList.add("active-hightlight");
      }
      if (!isOnly && i >= first && i <= last) {
        item.classList.add("active-hightlight");
      }
    });
  }
};

const scrollBox = reactive({
  active: null,
  ref: null,
  leftBottomRef: null,
  rightTopRef: null,
  handleScroll: () => {
    let scrollTop = scrollBox.ref.scrollTop;
    let scrollLeft = scrollBox.ref.scrollLeft;
    scrollBox.rightTopRef.scrollTo(scrollLeft, 0);
    scrollBox.leftBottomRef.scrollTo(0, scrollTop);
  },
});

watch(
  () => scrollBox.ref,
  () => {
    setHightLight(null);
    if (scrollBox.ref) {
      scrollBox?.ref?.addEventListener("scroll", scrollBox.handleScroll);
    } else {
      scrollBox?.ref?.removeEventListener("scroll", scrollBox.handleScroll);
    }
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<script>
export default {
  name: "GantContainer",
};
</script>

<style lang="less" scoped>
.gant-conatiner {
  // display: flex;
  position: relative;
  height: 100%;
  table {
    border-collapse: collapse;
    width: 765px;
    tr:nth-child(odd) {
      background: #0c3150;
      border: 0;
    }
    tr:nth-child(even) {
      background: #051630;
      border: 0;
    }
    th {
      text-align: center;
      background: #19648c;
      border: 1px solid #5f98b1;
    }
    td {
      padding-left: 6px;
      box-sizing: border-box;
      z-index: 2;
      text-align: center;
    }
    th,
    td {
      height: 32px;
      min-width: 18px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      padding: 0;
    }
  }

  .left-top-box {
    height: 65px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .left-bottom-box {
    height: calc(100% - 65px);
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 65px;
    td {
      border: 0;
    }
    .title1,
    .title2,
    .title3 {
      background: #0c304d;
      border: 1px solid #5f98b1;
      padding-right: 6px;
      text-align: left;
      min-width: 200px;
    }
    .title1 {
      left: 0;
      cursor: pointer;
    }
  }
  .right-top-box {
    height: 65px;
    width: calc(100% - 766px);
    overflow: hidden;
    position: absolute;
    left: 766px;
    top: 0;
    th {
      max-width: 18px;
      box-sizing: border-box;
    }
  }

  .right-bottom-box {
    // flex: 1;
    position: absolute;
    left: 766px;
    top: 65px;
    height: calc(100% - 65px);
    width: calc(100% - 766px);
    overflow: overlay;
    position: relative;

    tr:nth-child(even) {
      background: #0c3150;
      border: 0;
    }
    tr:nth-child(odd) {
      background: #051630;
      border: 0;
    }

    .split-line {
      position: absolute;
      border-left: 1px dashed #5f98b1;
      height: 100%;
      left: 17px;
      opacity: 0.5;
    }
  }
  .active-hightlight {
    &,
    & > td {
      background: red !important;
    }
  }
}
</style>