```
<template>
  <h4>DvFullscreen 组件 测试</h4>
  <DvFullscreen @zoomIn="zoomIn" @zoomOut="zoomOut">
    <div>
      <div>这是要全屏的 内容</div>
      <div>这是要全屏的 内容</div>
      <div>这是要全屏的 内容</div>
    </div>
  </DvFullscreen>
</template>

<script setup>
const zoomIn = () => {
  console.log('缩小')
}

const zoomOut = () => {
  console.log('放大')
}
</script>
```
