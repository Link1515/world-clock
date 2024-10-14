<script setup>
import { ref, watch } from 'vue';

const isOpen = defineModel({ type: Boolean });
const modal = ref();

const openModal = () => {
  modal.value.classList.add('is-active');
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  setTimeout(() => modal.value.classList.remove('is-active'), 300);
  document.body.style.overflow = '';
};

watch(isOpen, () => {
  isOpen.value ? openModal() : closeModal();
});
</script>

<template>
  <Transition name="fade">
    <div ref="modal" class="modal" v-show="isOpen">
      <div class="modal-background" @click="isOpen = false"></div>
      <div class="modal-content px-4">
        <div class="box">
          <slot />
        </div>
      </div>
      <button class="modal-close is-large" @click="isOpen = false"></button>
    </div>
  </Transition>
</template>

<style scoped>
.modal-content {
  height: 100%;
  max-width: 450px;
  display: flex;
  align-items: center;
}
</style>
