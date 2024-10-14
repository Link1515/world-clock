<script setup>
import { ref, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faXmark, faBars } from '@fortawesome/free-solid-svg-icons';
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

const showCard = ref(false);
onMounted(() => {
  showCard.value = true;
});

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
  <Transition name="bounce">
    <div class="card" v-if="showCard">
      <div class="card-content">
        <Transition name="bounce">
          <button class="drag-handler" v-show="isEditing">
            <FontAwesomeIcon :icon="faBars" />
          </button>
        </Transition>
        <Transition name="bounce">
          <button
            v-show="props.isEditing"
            class="remove-btn"
            @click="openModal"
          >
            <FontAwesomeIcon :icon="faXmark" />
          </button>
        </Transition>
        <div class="content">
          <p class="title has-text-centered mb-2">{{ props.time }}</p>
          <div class="subtitle has-text-centered">
            {{ props.timezone }}
          </div>
        </div>
      </div>
    </div>
  </Transition>

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
  min-height: 150px;
}

.card-content {
  position: relative;
  padding-left: 36px;
  padding-right: 36px;
  user-select: none;
}

.remove-btn {
  width: 28px;
  height: 28px;
  font-size: 1.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: grid;
  place-items: center;
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
  font-size: 1.75rem;
  color: var(--bulma-link);
  display: grid;
  place-items: center;
  cursor: grab;
}

.drag-handler:active {
  cursor: grabbing;
}
</style>
