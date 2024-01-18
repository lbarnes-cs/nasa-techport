<template>
  <div class="container">
    <div class="resultsPerPage">
      Results per page:

      <select
        v-model="resultsPerPage"
        @change="(event) => handlePerPage(event.target.value)"
      >
        <option
          v-for="option in resultsPerPageOptions"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <nav class="pagination">
      <button
        :disabled="!previousPage"
        class="pagination__item pagination__item--nav"
        @click="handlePageChange(previousPage)"
      >
        &lt;
      </button>

      <template v-if="totalPages < maxPageLength">
        <a
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          :class="[
            'pagination__item',
            { 'pagination__item--active': currentPage === pageNumber },
          ]"
          @click="handlePageChange(pageNumber)"
        >
          {{ pageNumber }}
        </a>
      </template>

      <button
        :disabled="!nextPage"
        class="pagination__item pagination__item--nav"
        @click="handlePageChange(nextPage)"
      >
        &gt;
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
// import { setData } from 'nuxt-storage/local-storage';
import type { PaginationComponentType } from '@/types/Pagination';

const props = defineProps<PaginationComponentType>();

const maxPageLength = 20;
const resultsPerPage = ref(props.resultsPerPage);
const resultsPerPageOptions: number[] = ref([10, 25, 50]);

const emit = defineEmits(['changePage', 'changeResultsPerPage']);

const handlePageChange = (page: number) => {
  emit('changePage', page);
};

const handlePerPage = (perPage: string) => {
  emit('changeResultsPerPage', Number(perPage));
  // setData('resultsPerPage', Number(perPage), 7, 'd');
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
}

.resultsPerPage {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);

  select {
    padding: var(--spacing-xs) var(--spacing-sm);
    border-color: var(--border-color);
    border-radius: var(--border-radius-sm);
  }
}

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
        border-radius: var(--border-radius-sm) 0 0 var(--border-radius-sm);
      }

      &:last-of-type {
        border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;
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
