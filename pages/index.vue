<template>
  <div>
    <div v-if="error">
      <p>{{ error }}</p>
    </div>

    <div v-else>
      <div class="header">
        <h1>NASA Project search</h1>

        <loadingState v-if="pending" />

        <div v-else>
          <div class="searchInput">
            <span class="searchInput__placeholder">Search by date:</span>

            <div class="searchInput__input">
              <ClientOnly>
                <VueDatePicker
                  v-model="searchDate"
                  :enable-time-picker="false"
                  :max-date="maxSearchDate"
                  :clearable="false"
                  format="yyyy-MM-dd"
                />

                <template #fallback>
                  <span class="searchInput__loading">Loading...</span>
                </template>
              </ClientOnly>
            </div>

            <button class="button button--wide" @click="handleSearch">
              <ClientOnly>
                <IconCSS
                  class="icon"
                  name="streamline:interface-edit-zoom-in-enhance-glass-in-magnify-magnifying-zoom"
                />
              </ClientOnly>

              Search
            </button>
          </div>

          <ClientOnly>
            <div v-if="searchProjects?.totalCount" class="header__count">
              <span>
                Total number of projects: {{ searchProjects.totalCount }}
              </span>

              <span>
                Showing <strong>{{ currentPage }}</strong> to
                <strong>{{ paginatedPrograms.totalPages }}</strong> of
                <strong>{{ searchProjects.totalCount }}</strong> results
              </span>
            </div>
          </ClientOnly>
        </div>
      </div>

      <div>
        <loadingCards v-if="pending" />

        <ClientOnly>
          <template #fallback>
            <loadingCards />
          </template>

          <searchResults
            v-if="!pending && paginatedPrograms.items"
            :projects="paginatedPrograms.items"
          />

          <pagination
            v-if="!pending"
            class="paginationContainer"
            :previous-page="paginatedPrograms.previousPage"
            :next-page="paginatedPrograms.nextPage"
            :total-pages="paginatedPrograms.totalPages"
            :current-page="currentPage"
            :results-per-page="resultsPerPage"
            @change-page="handleChangePage"
            @change-results-per-page="handleResultsPerPage"
          />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getData } from 'nuxt-storage/local-storage';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import type {
  ProjectSummary,
  ProjectsResponseBodyType,
} from '@/types/ProjectSearchResponse';
import type { PaginateType } from '@/types/Pagination';

import {
  getCurrentDate,
  getPreviousDate,
  formatDateToString,
} from '@/utils/date';

import searchResults from '@/components/projectSearchResults/searchResults.vue';
import pagination from '@/components/pagination/index.vue';
import loadingCards from '@/components/loading/loadingCards.vue';
import loadingState from '@/components/loading/loadingState.vue';

const config = useRuntimeConfig();

const currentPage = ref<number>(1);
const paginatedItems = ref<ProjectSummary[] | null>(null);
const resultsPerPage = ref<number>(Number(getData('resultsPerPage')) || 25);

const maxSearchDate = ref<Date>(getCurrentDate());
const searchDate = ref(getPreviousDate(7));

const paginatedPrograms = computed(
  (): PaginateType =>
    paginate({
      perPage: resultsPerPage.value,
      currentPage: currentPage.value,
      list: searchProjects?.value?.projects,
    }),
);

const handleChangePage = (pageNumber: number) => {
  currentPage.value = pageNumber;
};

const handleResultsPerPage = (perPage: number) => {
  resultsPerPage.value = perPage;
};

const clearPagination = () => {
  currentPage.value = 1;
  paginatedItems.value = null;
};

const handleSearch = () => {
  clearPagination();
  executeSearch();
};

const headers = {
  Authorization: `Bearer ${config.public.apiToken}`,
};

// https://nuxt.com/docs/api/composables/use-async-data
const {
  data: searchProjects,
  error,
  pending,
  execute: executeSearch,
  // execute: () => clearPagination(),
} = await useAsyncData<ProjectsResponseBodyType>(
  'projects',
  () =>
    $fetch('/api/projects', {
      query: {
        updatedSince: formatDateToString(searchDate.value),
        apiKey: config.public.apiKey,
      },
      headers,
    }),
  {
    // Watch option allows automatically rerunning the
    // fetcher function when any changes are detected
    // watch: [searchDate],
  },
);
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  background: var(--white);
  padding: var(--spacing) var(--spacing-md);
  margin: 0 calc(var(--spacing-md) * -1);

  &__count {
    display: flex;
    justify-content: space-between;

    strong {
      font-weight: 500;
    }
  }
}

.paginationContainer {
  margin: var(--spacing-xl) 0;
}

.searchInput {
  display: flex;
  justify-content: center;
  align-items: stretch;
  border-radius: var(--border-radius);

  border: 1px solid var(--border-color);
  background: var(--shade100);
  margin: var(--spacing) 0;

  &__placeholder {
    border-right: 1px solid var(--border-color);
    padding: var(--spacing-xs) var(--spacing);
    align-self: center;
    font-weight: 500;
  }

  &__input {
    flex: 1 0 auto;

    display: flex;
    align-items: center;
  }

  &__loading {
    padding-left: var(--spacing);
  }

  ::v-deep(.dp__main) {
    margin-bottom: -1px;
  }

  ::v-deep(.dp__input) {
    border: 0;
    border-bottom: var(--spacing-xs) solid transparent;
    background: none;
    transition: border-color 200ms ease-in-out;
    border-radius: 0;

    &:hover {
      border-bottom-color: var(--primary200);
    }
  }

  ::v-deep(.dp__icon) {
    margin-top: -2px;
  }

  ::v-deep(.button) {
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
  }
}
</style>
