```
<template>
  <div class="divider">
    <DvDivider direction="horizontal">
      <template v-slot:default>center</template>
    </DvDivider>
    <DvDivider
      direction="horizontal"
      contentPosition="left"
      borderStyle="dashed"
    >
      <template v-slot:default>left</template>
    </DvDivider>
  </div>
</template>
```
