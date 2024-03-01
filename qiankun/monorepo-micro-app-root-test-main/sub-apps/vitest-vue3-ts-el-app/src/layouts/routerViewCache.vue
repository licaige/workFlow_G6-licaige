<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouteCacheStore } from '@/stores/routecache';

const $route = useRoute();
const routeCacheStore = useRouteCacheStore();

const getCachedRoutes = computed(() => routeCacheStore.getCachedRoutes);

const keepAliveCached = computed(() => {
  const { keepAlive } = $route.meta;
  return typeof keepAlive === 'boolean' ? keepAlive : !!getCachedRoutes.value.length;
});

</script>

<template>
  <transition v-if="keepAliveCached">
    <keep-alive :include="getCachedRoutes">
      <router-view />
    </keep-alive>
  </transition>
  <router-view v-else></router-view>
</template>