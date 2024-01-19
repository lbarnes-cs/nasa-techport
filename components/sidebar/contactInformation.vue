<template>
  <dt data-test="contactInfo-title">{{ title }}:</dt>
  <dd>
    <a
      v-for="{ fullName, primaryEmail, contactId } in contacts"
      :key="contactId"
      :href="`mailto://${primaryEmail}`"
      class="contactInfo"
      data-test="contactInfo-contact"
      >{{ fullName }}</a
    >
  </dd>
</template>

<script setup lang="ts">
import type { managerContactInformation } from '@/types/ProjectItemResponse';

defineProps<{
  title: string;
  contacts: Array<managerContactInformation>;
}>();
</script>

<style lang="scss" scoped>
.contactInfo {
  display: inline-block;

  &:not(:first-of-type) {
    margin-top: var(--spacing-xs);
  }
}
</style>
