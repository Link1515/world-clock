<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useModal } from '~/composables/useModal';

const props = defineProps({
  time: {
    type: String,
    required: true
  },
  timezone: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['removeClock']);

const modal = ref();
const { openModal, closeModal } = useModal(modal);
</script>

<template>
  <div class="card">
    <div class="card-content">
      <button class="remove-btn" @click="openModal">
        <FontAwesomeIcon :icon="faXmark" />
      </button>
      <div class="content">
        <p class="title has-text-centered mb-2">{{ props.time }}</p>
        <div class="subtitle has-text-centered">
          {{ props.timezone }}
        </div>
      </div>
    </div>
  </div>

  <div ref="modal" class="modal">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content px-4">
      <div class="box">
        <h3 class="is-size-4 mb-5">Remove {{ props.timezone }}?</h3>
        <div class="has-text-centered">
          <button
            class="button is-danger has-text-light"
            @click="emit('removeClock', props.timezone)"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" @click="closeModal"></button>
  </div>
</template>

<style scoped>
.card {
  margin-bottom: 0;
}

.card-content {
  position: relative;
  min-height: 150px;
}

.remove-btn {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0.5rem;
  right: 1rem;
}

.modal-content {
  max-width: 450px;
}
</style>
