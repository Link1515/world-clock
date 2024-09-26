<script setup>
import { onMounted } from 'vue';
import { initTheme } from '~/services/themeService';

import Header from '~/components/Header.vue';

onMounted(initTheme);
</script>

<template>
  <div class="container px-4">
    <Header />
  </div>
</template>
