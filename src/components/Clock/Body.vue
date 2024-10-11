<script setup>
import { ref, watch, inject, nextTick } from 'vue';
import { vDraggable } from 'vue-draggable-plus';
import {
  getTimezones,
  updateTimezonesLocalStorageByClocks
} from '~/services/timezoneService';
import {
  getClocksFromTimezones,
  addClockByTimezone,
  removeClockByTimezone,
  updateClocks
} from '~/services/clockService';
import { scrollToBottom } from '~/utils';

import ClockCard from '~/components/Clock/Card.vue';
import ClockCreateBtn from '~/components/Clock/CreateBtn.vue';

const isEditing = inject('isEditing');
const hourDisplay = inject('hourDisplay');
const timezones = getTimezones();
const clocks = ref(getClocksFromTimezones(timezones, hourDisplay.value));

const refreshClocks = () => updateClocks(clocks.value, hourDisplay.value);
watch(hourDisplay, refreshClocks);
setInterval(refreshClocks, 1000);

const addClock = async timezone => {
  addClockByTimezone(clocks.value, timezone, hourDisplay.value);

  await nextTick();
  scrollToBottom();

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

const vueDraggableConfig = {
  animation: 150,
  handle: '.drag-handler',
  onEnd: onDragEnd
};
</script>

<template>
  <div
    class="fixed-grid has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop"
  >
    <div class="grid" v-draggable="[clocks, vueDraggableConfig]">
      <div class="cell" v-for="clock in clocks" :key="clock.timezone">
        <ClockCard
          :time="clock.time"
          :timezone="clock.timezone"
          :is-editing="isEditing"
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
