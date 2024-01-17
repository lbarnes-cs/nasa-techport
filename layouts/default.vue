<template>
  <div class="page">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
};
</script>

<style lang="scss" scoped>
.page {
  padding: 0 var(--spacing);
  max-width: 880px;
  margin: 0 auto;
}
</style>
