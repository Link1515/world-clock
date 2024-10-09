<script setup>
import { ref, watch, inject } from 'vue';
import { vDraggable } from 'vue-draggable-plus';
import {
  getTimezones,
  updateTimezonesLocalStorageByClocks
} from '~/services/timeService';
import {
  getClocksFromTimezones,
  addClockByTimezone,
  removeClockByTimezone,
  updateClocks
} from '~/services/clockService';

import ClockCard from '~/components/Clock/Card.vue';
import ClockCreateBtn from '~/components/Clock/CreateBtn.vue';

const hourDisplay = inject('hourDisplay');
const timezones = getTimezones();
const clocks = ref(getClocksFromTimezones(timezones, hourDisplay.value));

const refreshClocks = () => updateClocks(clocks.value, hourDisplay.value);
watch(hourDisplay, refreshClocks);
setInterval(refreshClocks, 1000);

const addClock = timezone => {
  addClockByTimezone(clocks.value, timezone, hourDisplay.value);
  updateTimezonesLocalStorageByClocks(clocks.value);
  refreshClocks();
};

const removeClock = timezone => {
  removeClockByTimezone(clocks.value, timezone);
  updateTimezonesLocalStorageByClocks(clocks.value);
  refreshClocks();
};

const onDragEnd = () => {
  updateTimezonesLocalStorageByClocks(clocks.value);
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
          animation: 150,
          onEnd: onDragEnd
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

    <ClockCreateBtn @add-clock="addClock" />
  </div>
</template>

<style scoped>
.grid {
  gap: 1.5rem;
}
</style>
