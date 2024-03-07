<template>
  <div  @dragover.prevent="onDragover" @dragleave.prevent="isOver = false" @drop.prevent="onDrop">
    <slot></slot>
  </div>
  
</template>


<script lang="ts" setup>import { ref } from 'vue';

const isOver = ref(false)
const emit = defineEmits({})
const onDrop = (e:DragEvent) =>{
    e.stopPropagation();
    emit('file',Array.from(e.dataTransfer!.files))
}

const onDragover = function(){
  isOver.value = true;
}

</script>