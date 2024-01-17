<template>
  <nuxt-link
    :to="{
      name: 'project-pid',
      params: {
        pid: projectId,
      },
    }"
    class="projectSummaryCard"
  >
    <p class="projectSummaryCard__title">{{ title || 'Unknown Title' }}</p>

    <div class="projectSummaryCard__summary">
      Project Number: <span>{{ projectId }}</span>
    </div>

    <div class="projectSummaryCard__summary">
      Last updated: <span>{{ lastUpdated }}</span>
    </div>
  </nuxt-link>
</template>

<script setup></script>

<script setup lang="ts">
import type { ProjectSummary } from '@/types/ProjectSearchResponse';

defineProps<ProjectSummary>();
</script>

<style lang="scss" scoped>
.projectSummaryCard {
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  border: 1px #ccc solid;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.3s;

  p {
    margin: 0;
  }

  &:hover {
    box-shadow: var(--box-shadow);
  }

  &__title {
    font-weight: 500;
    font-size: 1em;
    padding: 0 0 var(--spacing-sm);
  }

  &__summary {
    display: flex;
    justify-content: space-between;
    color: var(--text-secondary);
    font-weight: 300;
  }
}
</style>
