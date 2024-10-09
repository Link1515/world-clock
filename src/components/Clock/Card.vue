<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from '~/components/Modal.vue';

const props = defineProps({
  time: {
    type: String,
    required: true
  },
  timezone: {
    type: String,
    required: true
  },
  isEditing: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['removeClock']);

const modalIsOpen = ref(false);
const openModal = () => {
  modalIsOpen.value = true;
};

const onClickRemove = () => {
  modalIsOpen.value = false;
  emit('removeClock', props.timezone);
};
</script>

<template>
  <div class="card">
    <div class="card-content">
      <button v-show="props.isEditing" class="remove-btn" @click="openModal">
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

  <Modal v-model="modalIsOpen">
    <h3 class="is-size-4 mb-5">Remove {{ props.timezone }}?</h3>
    <div class="has-text-centered">
      <button class="button is-danger has-text-light" @click="onClickRemove">
        Remove
      </button>
    </div>
  </Modal>
</template>

<style scoped>
.card {
  margin-bottom: 0;
}

.card-content {
  position: relative;
  padding-left: 36px;
  padding-right: 36px;
  min-height: 150px;
  user-select: none;
}

.remove-btn {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0.5rem;
  right: 1rem;
}
</style>
