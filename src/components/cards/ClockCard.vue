<script setup>
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
</script>

<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <p class="title has-text-centered mb-2">{{ props.time }}</p>
        <div class="subtitle has-text-centered">
          {{ props.timezone }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-content {
  min-height: 150px;
}
</style>
