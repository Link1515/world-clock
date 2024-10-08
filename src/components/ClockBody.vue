<script setup>
import { ref, watch, inject } from 'vue';
import {
  getTimezones,
  setTimezonesToLocalStorage
} from '~/services/timeService';
import { getClocksFromTimezones } from '~/services/clockService';

import ClockCard from '~/components/cards/ClockCard.vue';
import CreateClockCard from '~/components/cards/CreateClockCard.vue';

const hourDisplay = inject('hourDisplay');
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

const removeClock = timezone => {
  const removeIndex = timezones.indexOf(timezone);
  if (removeIndex < 0) return;

  timezones.splice(removeIndex, 1);
  setTimezonesToLocalStorage(timezones);
  updateClocks();
};
</script>

<template>
  <div
    class="fixed-grid has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop"
  >
    <div class="grid">
      <div class="cell" v-for="clock in clocks">
        <ClockCard
          :time="clock.time"
          :timezone="clock.timezone"
          @remove-clock="removeClock"
        />
      </div>
      <div class="cell">
        <CreateClockCard @add-clock="addClock" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  gap: 1.5rem;
}
</style>
