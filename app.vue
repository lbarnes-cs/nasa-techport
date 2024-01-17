<template>
  <NuxtLayout>
    <div v-if="checkForMissingToken()">
      <h1>Error: Missing API Token</h1>
      <setApiToken />
    </div>
    <NuxtPage v-else />
  </NuxtLayout>
</template>

<script setup>
import { checkIfApiTokenExists } from '@/utils/apiToken';
import setApiToken from '@/components/missingToken/setApiToken';

import '@unocss/reset/normalize.css';

const config = useRuntimeConfig();

const checkForMissingToken = () => {
  return !checkIfApiTokenExists(config);
};
</script>
