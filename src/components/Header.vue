<script setup>
import { ref, inject } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSun, faMoon, faGear } from '@fortawesome/free-solid-svg-icons';
import { toggleTheme, getTheme, THEME } from '~/services/themeService';
import {
  setHourDisplayToLocalStorage,
  toggleHourDisplay
} from '~/services/timeService';

const theme = ref(getTheme());
const toggleThemeStatus = () => {
  toggleTheme();
  theme.value = getTheme();
};

const hourDisplay = inject('hourDisplay');
const toggleHourDisplayStatus = () => {
  hourDisplay.value = toggleHourDisplay(hourDisplay.value);
  setHourDisplayToLocalStorage(hourDisplay.value);
};

const isEditing = inject('isEditing');
const toggleEditingStatus = () => (isEditing.value = !isEditing.value);
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
        <button
          class="button"
          :class="{ active: isEditing }"
          @click="toggleEditingStatus"
        >
          <FontAwesomeIcon :icon="faGear" />
        </button>
      </div>
      <div class="level-item">
        <button class="button" @click="toggleHourDisplayStatus">
          {{ hourDisplay }}
        </button>
      </div>
      <div class="level-item">
        <button class="button" @click="toggleThemeStatus">
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

.button.active {
  background-color: var(--bulma-link);
  color: var(--bulma-light);
}
</style>
