<script setup>
import { ref, watch } from 'vue';

const isOpen = defineModel({ type: Boolean });
const modal = ref();

const openModal = () => {
  modal.value.classList.add('is-active');
};

const closeModal = () => {
  modal.value.classList.remove('is-active');
};

watch(isOpen, () => {
  isOpen.value ? openModal() : closeModal();
});
</script>

<template>
  <div ref="modal" class="modal">
    <div class="modal-background" @click="isOpen = false"></div>
    <div class="modal-content px-4">
      <div class="box">
        <slot />
      </div>
    </div>
    <button class="modal-close is-large" @click="isOpen = false"></button>
  </div>
</template>

<style scoped>
.modal-content {
  max-width: 450px;
}
</style>
