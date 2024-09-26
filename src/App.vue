<script setup>
import { ref, watch } from 'vue';
import { initTheme } from '~/services/themeService';
import {
  getTimezones,
  setTimezonesToLocalStorage,
  getHourDisplay
} from '~/services/timeService';
import { getClocksFromTimezones } from '~/services/clockService';

import Header from '~/components/Header.vue';
import ClockCard from '~/components/cards/ClockCard.vue';
import CreateClockCard from '~/components/cards/CreateClockCard.vue';

initTheme();

const hourDisplay = ref(getHourDisplay());
const timezones = getTimezones();
const clocks = ref(getClocksFromTimezones(timezones, hourDisplay.value));

const updateClocks = () => {
  clocks.value = getClocksFromTimezones(timezones, hourDisplay.value);
};
setInterval(updateClocks, 1000);
watch(hourDisplay, updateClocks);

const addClock = timezone => {
  timezones.push(timezone);
  setTimezonesToLocalStorage(timezones);
  updateClocks();
};
</script>

<template>
  <div class="appContainer container px-4">
    <Header v-model:hourDisplay="hourDisplay" />
    <div
      class="fixed-grid has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop"
    >
      <div class="grid">
        <div class="cell" v-for="clock in clocks">
          <ClockCard :time="clock.time" :timezone="clock.timezone" />
        </div>
        <div class="cell">
          <CreateClockCard @add-clock="addClock" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.appContainer {
  min-height: 100dvh;
}
</style>
