<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { getAvailableTimezones } from '~/services/timeService';

const emit = defineEmits(['addClock']);

const modal = ref();

const openModal = () => {
  modal.value.classList.add('is-active');
};

const closeModel = () => {
  modal.value.classList.remove('is-active');
};

const timezones = getAvailableTimezones();
const selectedTimezone = ref(timezones[0]);

const addClock = () => {
  if (!selectedTimezone.value) return;
  emit('addClock', selectedTimezone.value);
  closeModel();
};
</script>

<template>
  <button @click="openModal" class="create-clock-btn">
    <div class="card">
      <div class="card-content">
        <div class="content flex has-text-link">
          <FontAwesomeIcon :icon="faSquarePlus" size="2x" />
        </div>
      </div>
    </div>
  </button>

  <div ref="modal" class="modal">
    <div class="modal-background" @click="closeModel"></div>
    <div class="modal-content px-4">
      <div class="box">
        <h3 class="is-size-4 mb-2">Select a timezone</h3>
        <div class="select mb-5">
          <select v-model="selectedTimezone">
            <option v-for="timezone in timezones" :value="timezone">
              {{ timezone }}
            </option>
          </select>
        </div>
        <div class="has-text-centered">
          <button class="button is-link" @click="addClock">Add</button>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" @click="closeModel"></button>
  </div>
</template>

<style scoped>
.create-clock-btn {
  width: 100%;
  height: 100%;
}

.card,
.card-content {
  height: 100%;
}
.card-content {
  display: grid;
  place-items: center;
}

.modal-content {
  max-width: 450px;
}

.select,
.select > select {
  width: 100%;
}
</style>
