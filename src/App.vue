<script setup>
import { onMounted } from 'vue';
import { initTheme, toggleTheme } from '~/services/themeService';

let htmlEl = null;

onMounted(initTheme);
</script>

<template>
  <div class="container">
    <button class="button" @click="toggleTheme">Toggle Theme</button>
  </div>
</template>
