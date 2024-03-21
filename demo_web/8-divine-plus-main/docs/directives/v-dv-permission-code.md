```
<template>
  <section class="block backtop" ref="app">
    <h4>v-dv-permission 指令测试</h4>
    <button v-dv-permission="{ target: [1, 2, 3], current: [1] }">
      按钮1-测试v-dvPermission
    </button>
    <button v-dv-permission="{ target: [1, 2, 3], current: [4] }">
      按钮2-测试v-dvPermission
    </button>
  </section>
</template>
```
