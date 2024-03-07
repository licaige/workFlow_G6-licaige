<script setup lang="ts">
import { ref } from 'vue'

const currentDate = ref(new Date())
</script>

<template>
  {{ currentDate }}
  <z-calendar v-model="currentDate">
    <template #date-cell="{ data }">
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split('-').slice(1).join('-') }}
        {{ data.isSelected ? '✔️' : '' }}
      </p>
    </template>
  </z-calendar>
</template>
