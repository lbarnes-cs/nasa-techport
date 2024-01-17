<template>
  <span
    :class="[
      'projectStatus',
      `projectStatus--${statusDescription.toLowerCase()}`,
    ]"
  >
    <ClientOnly>
      <IconCSS
        :key="statusDescription"
        class="icon"
        :name="getStatusIcon(statusDescription)"
      />
    </ClientOnly>
    {{ statusDescription }}
  </span>
</template>

<script setup lang="ts">
enum StatusDescriptionEnum {
  ACTIVE = 'Active',
  CANCELED = 'Canceled',
  COMPLETED = 'Completed',
}

defineProps<{
  statusDescription: StatusDescriptionEnum;
}>();

const getStatusIcon = (status: StatusDescriptionEnum) => {
  switch (status) {
    case 'Completed':
      return 'streamline:interface-validation-check-circle-checkmark-addition-circle-success-check-validation-add-form';
    case 'Canceled':
      return 'streamline:interface-delete-circle-button-delete-remove-add-circle-buttons';
    default:
      return 'streamline:interface-time-reset-time-clock-reset-stopwatch-circle-measure-loading';
  }
};
</script>

<style lang="scss" scoped>
.projectStatus {
  border-radius: var(--border-radius);
  color: var(--white);
  padding: var(--spacing-xs) var(--spacing-sm);
  display: inline-flex;
  align-items: center;
  font-weight: 400;
  margin-left: var(--spacing-md);

  &--active {
    background: var(--status-active);
  }

  &--completed {
    background: var(--status-completed);
  }

  &--canceled {
    background: var(--status-canceled);
  }

  ::v-deep(.icon) {
    margin-right: var(--spacing-md);
  }
}
</style>
