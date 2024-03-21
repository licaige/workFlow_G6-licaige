<template>
  <section>
    <input type="text" :value="modelValue" @input="inputChangeName" />
    <input type="text" :value="age" @input="inputChangeAge" />
    <input type="text" :value="sex" @input="inputChangeSex" />
    <div>name: {{ modelValue }}</div>
    <div>age: {{ age }}</div>
    <div>sex: {{ sex }}</div>
  </section>

  <section>
    <div>
      说明：1.默认情况v-mode用在组件上时，给组件内部传递的props是modelValue，而emit的事件名是update:modelValue
    </div>
    <div>
      说明：2.在组件上传递多个v-model时可以通过 ( 参数 v-model:aaa="xxx"
      v-model:bbb="xxx" )
      来指定多个值;props名是aaa,bbb；emit事件名是update:aaa,update:bbb
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";
const state = reactive({});

const props = defineProps({
  modelValue: String,
  age: Number,
  sex: String,
});

const emit = defineEmits(["update:modelValue", "update:age", "update:sex"]);

const inputChangeName = (e) => {
  emit("update:modelValue", e.target.value);
};

const inputChangeAge = (e) => {
  emit("update:age", e.target.value);
};

const inputChangeSex = (e) => {
  emit("update:sex", e.target.value);
};
</script>

<style lang="scss">
section {
  border: 1px solid black;
  padding: 20px;
  margin: 20px 0;
}
</style>
