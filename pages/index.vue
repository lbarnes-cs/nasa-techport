<template>
  <div>
    <h1>NASA Project search</h1>

    <div v-if="error">Error: {{ error }}</div>
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

      <div v-if="searchProjects" class="wrapper">
        <h2>Total projects found: {{ searchProjects.totalCount }}</h2>

        <div
          v-for="project in searchProjects.projects"
          :key="project.projectId"
          class="projects"
        >
          <div class="project">
            <p>Title: {{ project.title }}</p>
            <p>Last updated: {{ project.lastUpdated }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentDate, getPreviousDate } from "@/utils/date";
const config = useRuntimeConfig();

const page = ref(1);
const maxSearchDate = ref(getCurrentDate());
const searchDate = ref(getPreviousDate(7));

const headers = {
  // authentication header and jwt here
  // bearerAuth
  Authorization: `Bearer ${config.public.apiToken}`,
};

// https://nuxt.com/docs/api/composables/use-async-data
const {
  data: searchProjects,
  error,
  pending,
  refetch,
} = await useAsyncData(
  "projects",
  () =>
    $fetch(
      `${config.public.apiBase}/projects`,
      {
        query: {
          updatedSince: searchDate.value,
          apiKey: config.public.apiKey,
        },
      },
      {
        headers,
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

<style lang="scss" scoped>
.projects {
  display: grid;

  .project {
    max-width: 200px;
    padding: 4px;

    p {
      margin: 0;
    }
  }
}
</style>
