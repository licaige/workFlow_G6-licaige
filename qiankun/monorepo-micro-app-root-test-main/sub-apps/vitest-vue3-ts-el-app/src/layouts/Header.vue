<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, computed, toRefs, toRaw, ref, getCurrentInstance } from 'vue';
// import { useRouter } from "vue-router";
// import { mapState, mapGetters, mapActions } from 'vuex';
// import VueLogo from '@/assets/images/svg/vue.svg';

export default defineComponent({
  name: "HeadTop",
  props: {
    username: String,
    isRotate: {
      type: Boolean,
      required: true,
      default: false
    },
    //value: String
  },
  emits: ["collapsed"],
  setup(props: any, context: any) {
    // const { proxy } = getCurrentInstance() as any;
    // const state = reactive({
    //   // datetime: ref<any[]>([]),
    // });
    
    const isFoldIcon = computed(() =>
      props.isRotate
    );

    return {
      isFoldIcon
    };
  }
})
</script>

<template>
  <div class="head-top">
    <div class="head-logo">
      <img src="@/assets/images/svg/vue.svg" alt="Vue logo" />
      <span className="title">Vue3 App PC</span>
    </div>
    <el-icon class="menu-icon" @click="$emit('collapsed')">
      <IEpFold v-if="isFoldIcon"/>
      <IEpExpand v-else/>
    </el-icon>
    <div class="layout-nav">
      <span>王小虎</span>
        <!-- <i class="el-icon-edit win-icon" @click="$EventBus.$emit('showModifyPwd', true)"></i> -->
        <!-- <i class="el-icon-switch-button win-icon" @click="$EventBus.$emit('showLogout', true)"></i> -->
        <!-- <i class="el-icon-minus win-icon" @click="minimizeWin"></i> -->
        <!-- <i class="el-icon-copy-document win-icon" @click="maximizeWin"></i> -->
        <!-- <i class="el-icon-close win-icon" @click="closeWin"></i> -->
        <el-dropdown style="line-height: 50px">
          <el-icon class="win-icon"><IEpSetting /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .head-top {
    box-sizing: border-box;
    height: 50px;
    // width: 100%;
    top: 0;
    left: 0;
    padding: 0;
    line-height: 50px;
    font-size: 14px;
    /*background: #373d41;*/
    color: #f9f9f9;
    text-align: left;

    .win-icon {
      // display: inline-block;
      width: 20px;
      height: 20px;
      margin: 15px 8px;
      cursor: pointer;
      color: #f9f9f9;
    }
  }

  .menu-icon {
    transition: all .3s;
    margin-left: 15px;
    cursor: pointer;
    font-size: 16px;
  }
</style>
