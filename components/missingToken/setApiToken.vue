<template>
  <div>
    <p>To access the NASA database, you will need an API Token.</p>

    <p>
      Please visit the
      <a href="https://techport.nasa.gov/help/articles/api" target="_blank"
        >NASA API Documentation</a
      >
      and add a new token below.
    </p>

    <form @submit="onSubmit">
      <input
        v-model="apiToken"
        v-bind="apiTokenAttrs"
        name="apiToken"
        type="text"
      />

      <button>Submit</button>

      <span class="errorMessage">{{ errors.apiToken }}</span>
    </form>
  </div>
</template>

<script setup>
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { reloadNuxtApp } from 'nuxt/app';

import { setBearerToken } from '@/utils/apiToken';

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    apiToken: yup.string().required(),
  }),
});

const onSubmit = handleSubmit((values) => {
  setBearerToken(values.apiToken);
  reloadNuxtApp({
    path: '/',
    ttl: 1000,
  });
});

const [apiToken, apiTokenAttrs] = defineField('apiToken');
</script>
