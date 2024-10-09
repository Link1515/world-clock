<script setup>
import { ref, watch, inject } from 'vue';
import { vDraggable } from 'vue-draggable-plus';
import {
  getTimezones,
  getCurrentTime,
  updateTimezonesLocalStorageByClocks
} from '~/services/timeService';
import { getClocksFromTimezones } from '~/services/clockService';

import ClockCard from '~/components/cards/ClockCard.vue';
import CreateClockBtn from '~/components/CreateClockBtn.vue';

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
  clocks.value.push({
    timezone,
    time: ''
  });

  updateTimezonesLocalStorageByClocks(clocks.value);
  updateClocks();
};

const removeClock = timezone => {
  const removeIndex = clocks.value.findIndex(
    clock => clock.timezone === timezone
  );
  if (removeIndex < 0) return;
  clocks.value.splice(removeIndex, 1);

  updateTimezonesLocalStorageByClocks(clocks.value);
  updateClocks();
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

    <CreateClockBtn @add-clock="addClock" />
  </div>
</template>

<style scoped>
.grid {
  gap: 1.5rem;
}
</style>
