<template>
  <div class="loading">
    <ClientOnly>
      <IconCSS class="icon" name="eos-icons:bubble-loading" />
    </ClientOnly>

    Scanning for life signs
  </div>
</template>

<style lang="scss" scoped>
.loading {
  margin: var(--spacing-xl) 0;
  text-align: center;
  font-weight: 500;
  display: flex;
  align-items: center;
  flex-direction: column;

  ::v-deep(.icon) {
    margin-bottom: var(--spacing-sm);
    font-size: 1.6em;
  }
}
</style>
