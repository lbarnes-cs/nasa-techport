<template>
  <div class="card">
    <ClientOnly fallback="Loading...">
      <IconCSS class="icon" name="eos-icons:bubble-loading" />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.card {
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  border: 1px #ccc solid;
  text-decoration: none;
  background: var(--white);
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ::v-deep(.icon) {
    margin-bottom: var(--spacing);
  }
}
</style>
