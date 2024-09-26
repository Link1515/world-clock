<script setup>
import { ref, nextTick } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { toggleTheme, getTheme, THEME } from '~/services/themeService';
import { setHourDisplay, toggleHourDisplayStr } from '~/services/timeService';

const theme = ref(getTheme());
const toggleThemeAndFlag = () => {
  toggleTheme();
  theme.value = getTheme();
};

const hourDisplay = defineModel('hourDisplay');
const toggleHourDisplay = async () => {
  hourDisplay.value = toggleHourDisplayStr(hourDisplay.value);
  await nextTick();
  setHourDisplay(hourDisplay.value);
};
</script>

<template>
  <nav class="level is-mobile py-2">
    <div class="level-left">
      <div class="level-item">World Clock</div>
    </div>

    <div class="level-right">
      <div class="level-item">
        <button class="button" @click="toggleHourDisplay">
          {{ hourDisplay }}
        </button>
      </div>
      <div class="level-item">
        <button class="button" @click="toggleThemeAndFlag">
          <FontAwesomeIcon v-show="theme === THEME.LIGHT" :icon="faSun" />
          <FontAwesomeIcon v-show="theme === THEME.DARK" :icon="faMoon" />
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.button {
  width: 40px;
  height: 40px;
}
</style>
