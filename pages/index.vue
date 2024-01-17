<template>
  <div>
    <h1>NASA Project search</h1>

    <div v-if="error">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="pending">pending</div>

    <div v-else>
      <h1>Hello world</h1>

      <input
        v-model="searchDate"
        :disabled="pending"
        type="date"
        :max="maxSearchDate"
      />

      <button @click="handleSearch">
        <IconCSS
          class="icon"
          name="streamline:interface-edit-zoom-in-enhance-glass-in-magnify-magnifying-zoom"
        />
      </button>

      <searchResults v-if="searchProjects" v-bind="searchProjects" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  ProjectSummary,
  ProjectsResponseBody,
} from '@/types/ProjectSearchResponse';

import { getCurrentDate, getPreviousDate } from '@/utils/date';
import { getBearerToken } from '@/utils/apiToken';

import searchResults from '@/components/projectSearchResults/searchResults.vue';

const config = useRuntimeConfig();

const currentPage = ref<number>(1);
const previousPage = ref<number>(0);
const nextPage = ref<number>(0);
const paginatedItems = ref<ProjectSummary[] | null>(null);

const maxSearchDate = ref<string>(getCurrentDate());
// const searchDate = ref(getPreviousDate(7));
const searchDate = ref<string>(getPreviousDate(4));

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
  Authorization: `Bearer ${getBearerToken(config)}`,
};

// https://nuxt.com/docs/api/composables/use-async-data
const {
  data: searchProjects,
  error,
  pending,
  execute: executeSearch,
  // execute: () => clearPagination(),
} = await useAsyncData<ProjectsResponseBody[] | null>(
  'projects',
  () =>
    $fetch('/api/projects', {
      query: {
        updatedSince: searchDate.value,
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
