<template>
  <div>
    <div v-if="error">Error: {{ error }}</div>
    <div v-else-if="pending">pending</div>

    <div v-else>
      <h1>Hello world</h1>

      <input
        v-model="maxSearchDate"
        :disabled="pending"
        type="date"
        :max="maxSearchDate"
      />

      <input type="button" value="Refetch" @click="refetch" />

      <div v-if="posts" class="wrapper">
        <h1>Posts</h1>
        {{ posts }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentDate } from "@/utils/date";
const config = useRuntimeConfig();

const page = ref(1);
const maxSearchDate = ref(getCurrentDate());
const searchDate = ref(getCurrentDate()); // ISO 8601 full-date in the format YYYY-MM-DD

const headers = {
  // authentication header and jwt here
  // bearerAuth
  Authorization: `Bearer  ${config.apiSecret}`,
};

// https://nuxt.com/docs/api/composables/use-async-data
const {
  data: posts,
  error,
  pending,
  refetch,
} = await useAsyncData(
  "posts",
  () =>
    $fetch(
      `${config.public.apiBase}/projects`,
      {
        query: {
          updatedSince: "2024-01-13",
          apiKey: config.public.apiKey,
        },
      },
      {
        headers,
        params: {
          updatedSince: searchDate.value,
        },
        immediate: false,
      },
    ),
  {
    watch: [page, searchDate],
  },
);

// const dataTwice = await $fetch(
//   `${config.public.apiBase}/projects?updatedSince=2024-01-14&api_key=${config.public.apiKey}`,
//   {},
// );

// const {
//   data: posts,
//   error,
//   pending,
//   refetch,
// } = await useFetch(
//   `${config.public.apiBase}/projects`,
//   {
//     query: {
//       updatedSince: "2024-01-13",
//       apiKey: config.public.apiKey,
//     },
//   },
//   { headers },
// );
</script>
