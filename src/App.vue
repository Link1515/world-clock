<script setup>
import { initTheme } from '~/services/themeService';
import { getUserTimezone } from '~/services/timeService';

import Header from '~/components/Header.vue';
import ClockCard from '~/components/ClockCard.vue';

initTheme();

const userTimezone = getUserTimezone();
</script>

<template>
  <div class="container px-4">
    <Header />
    <div
      class="fixed-grid has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop"
    >
      <div class="grid">
        <div class="cell">
          <ClockCard :timezone="userTimezone" />
        </div>
      </div>
    </div>
  </div>
</template>
