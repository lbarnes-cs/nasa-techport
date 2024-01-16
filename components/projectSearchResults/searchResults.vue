<template>
  <div class="searchResults">
    <div class="searchResults__title">
      Total number of items: {{ totalCount }}
    </div>

    <div class="searchResults__results">
      <projectSummaryCard
        v-for="project in projects"
        :key="project.projectId"
        v-bind="project"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import projectSummaryCard from './projectSummaryCard.vue';

import type { ProjectSummary } from '@/types/ProjectSearchResponse';

defineProps<{
  projects?: Array<ProjectSummary>;
  totalCount: Number;
}>();
</script>

<style lang="scss" scoped>
.searchResults {
  &__title {
    margin: 0 0 8px;
  }

  &__results {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
