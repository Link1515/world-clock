<script setup>
import { ref, onUnmounted } from 'vue';
import { getCurrentTime } from '~/services/timeService';

const props = defineProps({
  timezone: {
    type: String,
    required: true
  }
});

const time = ref(getCurrentTime(props.timezone));
const intervalTimer = setInterval(() => {
  time.value = getCurrentTime(props.timezone);
}, 1000);

onUnmounted(() => clearInterval(intervalTimer));
</script>

<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <p class="title has-text-centered mb-2">{{ time }}</p>
        <div class="subtitle has-text-centered">
          {{ props.timezone }}
        </div>
      </div>
    </div>
  </div>
</template>
