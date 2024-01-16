<template>
  <div>
    <h1>NASA Project search</h1>

    <div v-if="error">
      <p>{{ error }}</p>

      <clearApiToken />
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

      <input type="button" value="Refetch" @click="refetch" />

      <searchResults v-if="searchProjects" v-bind="searchProjects" />
    </div>
  </div>
</template>

<script setup>
import { getCurrentDate, getPreviousDate } from '@/utils/date';
import { getBearerToken } from '@/utils/apiToken';

import searchResults from '@/components/projectSearchResults/searchResults.vue';
import clearApiToken from '@/components/missingToken/clearApiToken';

const config = useRuntimeConfig();

const page = ref(1);
const maxSearchDate = ref(getCurrentDate());
// const searchDate = ref(getPreviousDate(7));
const searchDate = ref(getPreviousDate(4));

const headers = {
  // authentication header and jwt here
  // bearerAuth
  Authorization: `Bearer ${getBearerToken(config)}`,
};

// https://nuxt.com/docs/api/composables/use-async-data
// const {
//   data: searchProjects,
//   error,
//   pending,
//   refetch,
// } = await useAsyncData(
//   'projects',
//   () =>
//     $fetch(
//       `${config.public.apiBase}/projects`,
//       {
//         query: {
//           updatedSince: searchDate.value,
//           apiKey: config.public.apiKey,
//         },
//       },
//       {
//         headers,
//         immediate: false,
//       },
//     ),
//   {
//     watch: [page, searchDate],
//   },
// );

// const dataTwice = await $fetch(
//   `${config.public.apiBase}/projects?updatedSince=2024-01-14&api_key=${config.public.apiKey}`,
//   {},
// );

const {
  data: searchProjects,
  error,
  pending,
  refetch,
} = await useFetch(
  `/api/projects`,
  // `${config.public.apiBase}/projects`,
  {
    query: {
      updatedSince: searchDate.value,
      apiKey: config.public.apiKey,
    },
  },
  { headers },
);
</script>
