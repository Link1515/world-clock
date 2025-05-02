<script setup>
import { ref, watch, inject, nextTick } from 'vue';
import { vDraggable } from 'vue-draggable-plus';
import { getTimezones } from '~/services/timezoneService';
import {
  getClocksFromTimezones,
  addClock,
  removeClock,
  refreshClocks,
  handleDragEnd
} from '~/services/clockService';
import { scrollToBottom } from '~/utils';

import ClockCard from '~/components/Clock/Card.vue';
import ClockCreateBtn from '~/components/Clock/CreateBtn.vue';

const isEditing = inject('isEditing');
const hourDisplay = inject('hourDisplay');
const timezones = getTimezones();
const clocks = ref(getClocksFromTimezones(timezones, hourDisplay.value));

watch(hourDisplay, () => refreshClocks(clocks.value, hourDisplay.value));
setInterval(() => refreshClocks(clocks.value, hourDisplay.value), 1000);

const onAddClock = async timezone => {
  addClock(clocks.value, timezone, hourDisplay.value);
  await nextTick();
  scrollToBottom();
};

const onRemoveClock = timezone => {
  removeClock(clocks.value, timezone, hourDisplay.value);
};

const onDragEnd = () => handleDragEnd(clocks.value);

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
          @remove-clock="onRemoveClock"
        />
      </div>
    </div>

    <ClockCreateBtn @add-clock="onAddClock" />
  </div>
</template>

<style scoped>
.grid {
  gap: 1.5rem;
}
</style>
