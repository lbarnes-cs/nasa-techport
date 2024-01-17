<template>
  <div class="searchResults">
    <projectSummaryCard
      v-for="project in projects"
      :key="project.projectId"
      v-bind="project"
    />
  </div>
</template>

<script setup lang="ts">
import projectSummaryCard from './projectSummaryCard.vue';

import type { ProjectSummary } from '@/types/ProjectSearchResponse';

defineProps<{
  projects?: Array<ProjectSummary>;
}>();
</script>

<style lang="scss" scoped>
.searchResults {
  display: grid;
  gap: var(--spacing);
  grid-template-columns: repeat(3, 1fr);
}
</style>
