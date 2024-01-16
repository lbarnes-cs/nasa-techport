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
    <p>{{ title || 'Unknown Title' }}</p>
    <p>Project Number: {{ projectId }}</p>
    <p>Last updated: {{ lastUpdated }}</p>
  </nuxt-link>
</template>

<script setup></script>

<script setup lang="ts">
import type { ProjectSummary } from '@/types/ProjectSearchResponse';

const props = defineProps<ProjectSummary>();
</script>

<style lang="scss" scoped>
.projectSummaryCard {
  padding: 4px;
  border-radius: 4px;
  border: 1px #ccc solid;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.3s;

  p {
    margin: 0;
  }

  &:hover {
    box-shadow: 0 0 6px rgba(33, 33, 33, 0.2);
  }
}
</style>
