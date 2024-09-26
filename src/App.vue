<script setup>
import { ref } from 'vue';
import { initTheme } from '~/services/themeService';
import { getUserTimezone, getHourDisplay } from '~/services/timeService';

import Header from '~/components/Header.vue';
import ClockCard from '~/components/cards/ClockCard.vue';
import CreateClockCard from '~/components/cards/CreateClockCard.vue';

initTheme();

const hourDisplay = ref(getHourDisplay());
const userTimezone = getUserTimezone();

const timezones = ref([]);
timezones.value.push(userTimezone);
</script>

<template>
  <div class="container px-4">
    <Header v-model:hourDisplay="hourDisplay" />
    <div
      class="fixed-grid has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop"
    >
      <div class="grid">
        <div class="cell" v-for="timezone in timezones">
          <ClockCard :timezone="timezone" :hourDisplay="hourDisplay" />
        </div>
        <button class="cell">
          <CreateClockCard />
        </button>
      </div>
    </div>
  </div>
</template>
