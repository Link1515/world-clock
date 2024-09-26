<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
</script>

<template>
  <div class="card">
    <div class="card-content">
      <div class="content flex">
        <FontAwesomeIcon :icon="faSquarePlus" size="2x" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card,
.card-content {
  height: 100%;
}
.card-content {
  display: grid;
  place-items: center;
}
</style>
