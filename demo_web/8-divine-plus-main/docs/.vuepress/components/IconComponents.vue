<template>
  <ul>
    <li v-for="item in IconJson.glyphs" @click="onCopy(item)">
      <dv-icon
        :name="item.font_class"
        class="dv-icon__iconfont"
        useClass
      ></dv-icon>

      <div class="dv-icon-class-name">dv-icon-{{ item.font_class }}</div>
    </li>
  </ul>
</template>

<script setup>
import IconJson from "../../../packages/theme-chalk/fonts/iconfont.json";
import { copy } from "../../../packages/utils";
import { DvMessage } from "../../../packages";

const onCopy = (item) => {
  try {
    const icon = `<i class="dv-icon-${item.font_class}"></i>`;
    copy(icon);

    DvMessage({
      message: `${icon} 复制成功`,
      showClose: true,
      type: "success",
      duration: 1000,
      onClose: () => {
        console.log("close");
      },
    });
  } catch (e) {}
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

ul {
  display: flex;
  flex-flow: wrap;
  list-style: none;

  box-sizing: border-box;
  border: 1px solid #eaecef;
  border-top: none;
  border-bottom: none;
}

li {
  width: 25%;
  padding: 10px 0;
  box-sizing: border-box;
  border-right: 1px solid #eaecef;
  border-bottom: 1px solid #eaecef;

  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s;
}

li:hover {
  color: #409eff;
  cursor: pointer;
}

li:hover .dv-icon-class-name {
  color: #409eff;
}

li:nth-child(4n) {
  border-right: none;
}

.dv-icon__iconfont {
  font-size: 40px;
}
.dv-icon-class-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #99a9bf;
  font-size: 14px;
}
</style>
