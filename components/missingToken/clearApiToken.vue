<template>
  <div>
    You may be having an issue with your API token. Please try clearing it and
    getting a new token.

    <input type="submit" value="Reset token" @click="handleResetToken" />
  </div>
</template>

<script setup>
import { reloadNuxtApp } from 'nuxt/app';
import { clearBearerToken } from '@/utils/apiToken';

const handleResetToken = () => {
  clearBearerToken();
  reloadNuxtApp({
    path: '/',
    ttl: 1000,
  });
};
</script>
