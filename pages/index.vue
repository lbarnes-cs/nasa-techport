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

      <div v-if="posts && posts.length" class="wrapper">
        {{ posts.length }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentDate } from "@/utils/date";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJUZWNoUG9ydCIsImV4cCI6MTcwNTQwMDUxNSwibmJmIjoxNzA1MzE0MTE1LCJTRVNTSU9OX0lEIjoiSUhMeGpzN1NyQ1VzMHBiVGtCckhjNVA3VlZvWGNYS0hqUUJaIiwiRklOR0VSUFJJTlRfSEFTSCI6IjJBRjc0QTY5OThBRTgwMUJBOTYxOUM2REE5ODUyN0FFMzEwRjcwOURDMDI0NDIyNEFBNjRDRTlFNUQ2QzE2RjYifQ.I8dvwp0TajecAuRRwzXCpeYjp--pv6hxBBYpbY7WE5o";

const page = ref(1);
const maxSearchDate = ref(getCurrentDate());
const searchDate = ref(getCurrentDate()); // ISO 8601 full-date in the format YYYY-MM-DD

// https://nuxt.com/docs/api/composables/use-async-data
const {
  data: posts,
  error,
  pending,
  refetch,
} = await useAsyncData(
  "posts",
  () =>
    $fetch("https://techport.nasa.gov/api/projects?updatedSince=2024-01-15", {
      headers: {
        // authentication header and jwt here
        // bearerAuth
        Authorization: "Bearer " + token,
      },
      params: {
        updatedSince: searchDate.value,
      },
      immediate: false,
    }),
  {
    watch: [page, searchDate],
  },
);
</script>
