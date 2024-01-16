<template>
  <div>Pagination</div>
</template>

<script setup>
defineProps({
  cursor: Number,
  totalCount: Number,
});

console.log(props.cursor);
</script>
