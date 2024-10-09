<script setup>
import { ref, watch, inject } from 'vue';
import { vDraggable } from 'vue-draggable-plus';
import {
  getTimezones,
  setTimezonesToLocalStorage,
  getCurrentTime
} from '~/services/timeService';
import { getClocksFromTimezones } from '~/services/clockService';

import ClockCard from '~/components/cards/ClockCard.vue';

const hourDisplay = inject('hourDisplay');
const timezones = getTimezones();
const clocks = ref(getClocksFromTimezones(timezones, hourDisplay.value));

const updateClocks = () => {
  clocks.value.forEach(clock => {
    clock.time = getCurrentTime(clock.timezone, hourDisplay.value);
  });
};
watch(hourDisplay, updateClocks);

setInterval(updateClocks, 1000);

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
    <div
      class="grid"
      v-draggable="[
        clocks,
        {
          animation: 150
        }
      ]"
    >
      <div class="cell" v-for="clock in clocks">
        <ClockCard
          :time="clock.time"
          :timezone="clock.timezone"
          @remove-clock="removeClock"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  gap: 1.5rem;
}
</style>
