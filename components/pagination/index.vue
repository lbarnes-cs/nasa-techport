<template>
  <nav class="pagination">
    <button
      :disabled="!previousPage"
      class="pagination__item pagination__item--nav"
      @click="pagination(previousPage)"
    >
      &lt;
    </button>

    <a
      v-for="pageNumber in totalPages"
      v-if="totalPages < maxPageLength"
      :key="pageNumber"
      :class="[
        'pagination__item',
        { 'pagination__item--active': currentPage === pageNumber },
      ]"
      @click="pagination(pageNumber)"
    >
      {{ pageNumber }}
    </a>

    <button
      :disabled="!nextPage"
      class="pagination__item pagination__item--nav"
      @click="pagination(nextPage)"
    >
      &gt;
    </button>
  </nav>
</template>

<script setup lang="ts">
import type { PaginationComponentType } from '@/types/Pagination';

defineProps<PaginationComponentType>();

const maxPageLength = 20;

const emit = defineEmits(['changePage']);

const pagination = (page: number) => {
  emit('changePage', page);
};
</script>

<style lang="scss" scoped>
.pagination {
  display: inline-flex;

  &__item {
    display: inline-flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;

    width: var(--spacing-xl);
    height: var(--spacing-xl);

    border: 0;
    outline: 0;
    transition:
      ease-in-out 200ms background-color,
      ease-in 300ms color;
    background: transparent;

    color: var(--text-link);
    margin-left: 0px;
    margin-right: -1px;
    box-shadow:
      rgb(255, 255, 255) 0px 0px 0px 0px inset,
      rgb(209, 213, 219) 0px 0px 0px 1px inset,
      rgba(3, 2, 2, 0) 0px 0px 0px 0px;

    &--active {
      font-weight: 500;
      color: var(--white);
      background: var(--text-link);
    }

    &--nav {
      color: var(--shade600);

      &:first-of-type {
        border-radius: var(--border-radius) 0 0 var(--border-radius);
      }

      &:last-of-type {
        border-radius: 0 var(--border-radius) var(--border-radius) 0;
      }
    }

    &:hover:not(&--active) {
      background-color: var(--primary50);
    }

    &:disabled,
    &[disabled] {
      background-color: transparent;
      color: var(--shade300);
      cursor: default;
    }
  }
}
</style>
