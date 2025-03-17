<script setup>
import Header from './components/Header.vue';
</script>

<template>
  <Header></Header>
  <RouterView class="page-content" />
</template>

<style scoped>
.page-content {
  padding: 50px 90px;
}
</style>
