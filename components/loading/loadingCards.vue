<template>
  <div class="loading">
    <cardSkeleton v-for="index in 6" :key="index" />
  </div>
</template>

<script setup lang="ts">
import cardSkeleton from './cardSkeleton.vue';
</script>

<style lang="scss" scoped>
.loading {
  display: grid;
  gap: var(--spacing);
  grid-template-columns: repeat(3, 1fr);

  ::v-deep(.icon) {
    margin-bottom: var(--spacing-sm);
    font-size: 1.6em;
  }
}
</style>
