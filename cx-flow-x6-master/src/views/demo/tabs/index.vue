<template>
  <div>
    <a-tabs style="margin-top: 0" default-active-key="flow" tab-position="top" :destroy-inactive-tab-pane="true" size="small">
      <a-tab-pane key="flow" tab="流程图">
        <flow />
      </a-tab-pane>
      <a-tab-pane key="quickStart01" tab="快速上手01">
        <quick-start01 />
      </a-tab-pane>
      <a-tab-pane key="quickStart02" tab="快速上手02">
        <quick-start02 />
      </a-tab-pane>
      <a-tab-pane key="quickStart03" tab="快速上手03">
        <quick-start03 />
      </a-tab-pane>
      <a-tab-pane key="quickStart04" tab="快速上手04">
        <quick-start04 />
      </a-tab-pane>
      <a-tab-pane key="basic01" tab="基础教程01-画布">
        <basic01 />
      </a-tab-pane>
      <a-tab-pane key="basic0201" tab="基础教程02-01基类cell">
        <basic0201 />
      </a-tab-pane>
      <a-tab-pane key="basic0202" tab="基础教程02-02拖拽模板综合实例">
        <basic0202 />
      </a-tab-pane>

      <a-tab-pane key="basic0203" tab="基础教程02-03基类cell">
        <basic0203 />
      </a-tab-pane>

      <a-tab-pane key="basic03" tab="基础教程03-节点node">
        <basic03 />
      </a-tab-pane>
      <a-tab-pane key="basic0401" tab="基础教程04-01创建边、路径点、路由、链接器">
        <basic0401 />
      </a-tab-pane>
      <a-tab-pane key="basic0402" tab="基础教程04-02边的标签和公交路线实例">
        <basic0402 />
      </a-tab-pane>

      <a-tab-pane key="basic0501" tab="基础教程05-01 基础嵌套">
        <basic0501 />
      </a-tab-pane>

      <a-tab-pane key="basic0502" tab="基础教程05-02 交互创建嵌套">
        <basic0502 />
      </a-tab-pane>

      <a-tab-pane key="basic0503" tab="基础教程05-03 限制子节点的移动">
        <basic0503 />
      </a-tab-pane>

      <a-tab-pane key="basic0504" tab="基础教程05-04 交互创建嵌套+限制子节点的移动">
        <basic0504 />
      </a-tab-pane>

      <a-tab-pane key="basic0505" tab="基础教程05-05 自动扩展父节点">
        <basic0505 />
      </a-tab-pane>

      <a-tab-pane key="basic0506" tab="基础教程05-06 展开/折叠父节点">
        <basic0506 />
      </a-tab-pane>

      <a-tab-pane key="basic0601" tab="基础教程0601 创建链接桩">
        <basic0601 />
      </a-tab-pane>

      <a-tab-pane key="senior01" tab="高级进阶 vue">
        <senior01 />
      </a-tab-pane>

      <a-tab-pane key="senior02" tab="高级进阶 群组+vue">
        <senior02 />
      </a-tab-pane>

      <a-tab-pane key="senior03" tab="高级进阶 react在vue中使用 + XFlow">
        <senior03 />
      </a-tab-pane>

      <a-tab-pane key="senior04" tab="高级进阶 思维导图">
        <senior04 />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
  import flow from '../flow/index.vue';
  import quickStart01 from '../quickStart/index01.vue';
  import quickStart02 from '../quickStart/index02.vue';
  import quickStart03 from '../quickStart/index03.vue';
  import quickStart04 from '../quickStart/index04.vue';
  import basic01 from '../basic/index01.vue';
  import basic0201 from '../basic/index02-01.vue';
  import basic0202 from '../basic/index02-02.vue';
  import basic0203 from '../basic/index02-03.vue';
  import basic03 from '../basic/index03.vue';
  import basic0401 from '../basic/index04-1.vue';
  import basic0402 from '../basic/index04-2.vue';
  import basic0501 from '../basic/index05-1.vue';
  import basic0502 from '../basic/index05-2.vue';
  import basic0503 from '../basic/index05-3.vue';
  import basic0504 from '../basic/index05-4.vue';
  import basic0505 from '../basic/index05-5.vue';
  import basic0506 from '../basic/index05-6/index.vue';
  import basic0601 from '../basic/index06-01.vue';

  import senior01 from '../senior/index01/index.vue';
  import senior02 from '../senior/index02.vue';
  import senior03 from '../senior/index03/index.vue';
  import senior04 from '../senior/index04/index.vue';

  export default {
    name: 'DemoTab',
    components: {
      flow,
      quickStart01,
      quickStart02,
      quickStart03,
      quickStart04,
      basic01,
      basic0201,
      basic0202,
      basic0203,
      basic03,
      basic0401,
      basic0402,
      basic0501,
      basic0502,
      basic0503,
      basic0504,
      basic0505,
      basic0506,
      basic0601,
      senior01,
      senior02,
      senior03,
      senior04,
    },
  };
</script>

<style scoped></style>
