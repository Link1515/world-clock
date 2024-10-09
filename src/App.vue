<script setup>
import { ref, provide } from 'vue';
import { initTheme } from '~/services/themeService';
import { getHourDisplay } from '~/services/hourDisplayService';

import Header from '~/components/Header.vue';
import ClockBody from '~/components/Clock/Body.vue';

initTheme();

const hourDisplay = ref(getHourDisplay());
provide('hourDisplay', hourDisplay);

const isEditing = ref(false);
provide('isEditing', isEditing);
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
