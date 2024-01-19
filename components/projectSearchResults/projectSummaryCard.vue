<template>
  <cardSkeleton v-if="!title" data-test="projectCard-loading" />
  <nuxt-link
    v-else
    :to="{
      name: 'project-pid',
      params: {
        pid: projectId,
      },
    }"
    class="projectSummaryCard"
    data-test="projectCard"
  >
    <div class="projectSummaryCard__header">
      <p class="projectSummaryCard__title" data-test="projectCard-title">
        {{ title }}
      </p>
    </div>

    <div class="projectSummaryCard__content">
      <div class="projectSummaryCard__summary">
        Project Number: <span>{{ projectId }}</span>
      </div>

      <div class="projectSummaryCard__summary">
        Project Start Date: <span>{{ endDateString }}</span>
      </div>

      <div class="projectSummaryCard__summary">
        Project End Date: <span>{{ endDateString }}</span>
      </div>

      <div class="projectSummaryCard__summary">
        Last updated: <span>{{ lastUpdated }}</span>
      </div>

      <div
        v-if="statusDescription"
        class="projectSummaryCard__projectStatus"
        data-test="projectCard-status"
      >
        <projectStatus :status-description="statusDescription" />
      </div>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
import cardSkeleton from '@/components/loading/cardSkeleton.vue';
import projectStatus from '@/components/chip/projectStatus.vue';

import type { ProjectSummary } from '@/types/ProjectSearchResponse';

defineProps<ProjectSummary>();
</script>

<style lang="scss" scoped>
.projectSummaryCard {
  border-radius: var(--border-radius);
  border: 1px #ccc solid;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.3s;
  padding: var(--spacing-sm);
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  min-height: 170px;

  p {
    margin: 0;
  }

  &:hover {
    box-shadow: var(--box-shadow);
  }

  &__banner {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
  }

  &__header {
    font-weight: 500;
    font-size: 1em;
  }

  &__title {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__content {
    margin: var(--spacing-sm) 0 0;
  }

  &__summary {
    display: flex;
    justify-content: space-between;
    color: var(--text-secondary);
    font-weight: 300;
  }

  &__projectStatus {
    display: flex;
    justify-content: center;
    margin: var(--spacing-md) 0 0;
  }
}
</style>
