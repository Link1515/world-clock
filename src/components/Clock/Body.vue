<script setup>
import { ref, watch, inject } from 'vue';
import { vDraggable } from 'vue-draggable-plus';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
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

const isEditing = inject('isEditing');
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
      <div class="cell" v-for="clock in clocks" style="position: relative">
        <button class="drag-handler" v-show="isEditing">
          <FontAwesomeIcon :icon="faBars" />
        </button>
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

.drag-handler {
  width: 32px;
  height: 32px;
  position: absolute;
  z-index: 10;
  left: 2px;
  top: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  font-size: 1.25rem;
  display: grid;
  place-items: center;
  cursor: grab;
}

.drag-handler:active {
  cursor: grabbing;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
