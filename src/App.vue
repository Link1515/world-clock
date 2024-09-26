<script setup>
import { ref, provide } from 'vue';
import { initTheme } from '~/services/themeService';
import { getHourDisplay } from '~/services/timeService';

import Header from '~/components/Header.vue';
import ClockBody from '~/components/ClockBody.vue';

initTheme();

const hourDisplay = ref(getHourDisplay());
provide('hourDisplay', hourDisplay);
</script>

<template>
  <div class="appContainer container px-4">
    <Header />
    <ClockBody />
  </div>
</template>

<style>
.appContainer {
  min-height: 100dvh;
}
</style>
