<template>
  <a-card hoverable style="width: 240px">
    <template #cover>
      <img alt="example" :src="url" />
    </template>
    {{ title + '-' + context }}
  </a-card>
</template>

<script lang="ts">
  import { Node } from '@antv/x6';
  import { defineComponent, onMounted, ref, inject } from 'vue';
  import { Card } from 'ant-design-vue';

  export default defineComponent({
    name: 'Cyndi',
    components: {
      ACard: Card,
    },
    setup() {
      const title = ref('默认标题');
      const context = ref('默认内容');
      const url = ref('https://wx4.sinaimg.cn/mw2000/91f7624dly1h2jgtp0mdlj20qo0va78p.jpg');
      onMounted(() => {
        const getNode: Function | undefined = inject<Function>('getNode');
        const node: Node = getNode?.();
        title.value = node?.data?.title;
        context.value = node?.data?.context;
        url.value = node?.data?.url;
        // 监听数据改变事件
        node?.on('change:data', ({ current }) => {
          title.value = current.title;
        });
      });
      return {
        url,
        title,
        context,
      };
    },
  });
</script>

<style scoped></style>
