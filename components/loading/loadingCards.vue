<template>
  <div class="loading">
    <div v-for="index in 6" :key="index" class="card">loading</div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  display: grid;
  gap: var(--spacing);
  grid-template-columns: repeat(3, 1fr);

  ::v-deep(.icon) {
    margin-bottom: var(--spacing-sm);
    font-size: 1.6em;
  }

  .card {
    padding: var(--spacing-sm);
    border-radius: var(--border-radius);
    border: 1px #ccc solid;
    text-decoration: none;
    background: var(--shade100);
    height: 70px;
  }
}
</style>
