<script setup>
import { ref, inject } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { toggleTheme, getTheme, THEME } from '~/services/themeService';
import {
  setHourDisplayToLocalStorage,
  toggleHourDisplayStr
} from '~/services/timeService';

const theme = ref(getTheme());
const toggleThemeAndFlag = () => {
  toggleTheme();
  theme.value = getTheme();
};

const hourDisplay = inject('hourDisplay');
const toggleHourDisplay = () => {
  hourDisplay.value = toggleHourDisplayStr(hourDisplay.value);
  setHourDisplayToLocalStorage(hourDisplay.value);
};
</script>

<template>
  <nav class="level is-mobile py-2">
    <div class="level-left">
      <div class="level-item">
        <h1 class="has-text-link has-text-weight-bold is-size-5">
          World Clock
        </h1>
      </div>
    </div>

    <div class="level-right is-flex-direction-row">
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
