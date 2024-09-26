<script setup>
import { ref, onMounted } from 'vue';
import { toggleTheme, getTheme, THEME } from '~/services/themeService';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const theme = ref();

onMounted(() => (theme.value = getTheme()));

const onClickToggleThemeBtn = () => {
  toggleTheme();
  theme.value = getTheme();
};
</script>

<template>
  <nav class="level is-mobile py-2">
    <div class="level-left">
      <div class="level-item">World Clock</div>
    </div>

    <div class="level-right">
      <div class="level-item">
        <button class="toggleThemeBtn button" @click="onClickToggleThemeBtn">
          <FontAwesomeIcon v-show="theme === THEME.LIGHT" :icon="faSun" />
          <FontAwesomeIcon v-show="theme === THEME.DARK" :icon="faMoon" />
        </button>
      </div>
    </div>
  </nav>
</template>

<style>
.toggleThemeBtn {
  width: 40px;
  height: 40px;
}
</style>
