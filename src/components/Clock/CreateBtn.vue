<script setup>
import { ref, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { getAvailableTimezones } from '~/services/timezoneService';

import Modal from '~/components/Modal.vue';
import TimezoneSearchInput from '~/components/TimezoneSearchInput.vue';

const emit = defineEmits(['addClock']);

const modalIsOpen = ref(false);
const openModal = () => {
  modalIsOpen.value = true;
};

const selectedTimezone = ref('');

const addClock = () => {
  if (!selectedTimezone.value) return;
  emit('addClock', selectedTimezone.value);
  modalIsOpen.value = false;
  selectedTimezone.value = '';
};

const timezones = getAvailableTimezones();
const selectedTimezoneInvalid = computed(
  () => !timezones.includes(selectedTimezone.value)
);
</script>

<template>
  <button @click="openModal" class="create-clock-btn has-text-link">
    <FontAwesomeIcon :icon="faSquarePlus" size="2x" />
  </button>

  <Modal v-model="modalIsOpen">
    <div class="modal-wrapper">
      <h3 class="is-size-4 mb-2">Select a timezone</h3>

      <div class="mb-5">
        <TimezoneSearchInput
          v-model="selectedTimezone"
          :is-show="modalIsOpen"
        />
      </div>

      <div class="has-text-centered">
        <button
          class="button is-link"
          @click="addClock"
          :disabled="selectedTimezoneInvalid"
        >
          Add
        </button>
      </div>
    </div>
  </Modal>
</template>

<style scoped>
.create-clock-btn {
  position: fixed;
  right: 1rem;
  bottom: 3rem;
  width: 32px;
  height: 32px;
}

.card,
.card-content {
  height: 100%;
}

.card-content {
  display: grid;
  place-items: center;
  min-height: 150px;
}

.select,
.select > select {
  width: 100%;
}
</style>
