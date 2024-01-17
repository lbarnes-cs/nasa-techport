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
        </div>
      </div>

      <div v-if="!pending">
        <searchResults
          v-if="paginatedPrograms.items"
          :projects="paginatedPrograms.items"
        />

        <pagination
          class="paginationContainer"
          :previous-page="paginatedPrograms.previousPage"
          :next-page="paginatedPrograms.nextPage"
          :total-pages="paginatedPrograms.totalPages"
          :current-page="currentPage"
          @change-page="handleChangePage"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
import loadingState from '@/components/pending/loadingState.vue';

const config = useRuntimeConfig();

const currentPage = ref<number>(1);
const previousPage = ref<number>(0);
const nextPage = ref<number>(0);
const paginatedItems = ref<ProjectSummary[] | null>(null);

const maxSearchDate = ref<Date>(getCurrentDate());
const searchDate = ref(getPreviousDate(7));

const paginatedPrograms = computed(
  (): PaginateType =>
    paginate({
      perPage: 10,
      currentPage: currentPage.value,
      list: searchProjects?.value?.projects,
    }),
);

const handleChangePage = (pageNumber: number) => {
  currentPage.value = pageNumber;
};

const clearPagination = () => {
  currentPage.value = 1;
  previousPage.value = 0;
  nextPage.value = 0;
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
  display: flex;
  justify-content: center;
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
