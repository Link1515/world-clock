<script setup>
import { toggleTheme } from '~/services/themeService';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faWifi } from '@fortawesome/free-solid-svg-icons';

const toggleNabarBody = $event => {
  const navbarBurgerEl = $event.currentTarget;
  const target = navbarBurgerEl.dataset.target;
  const navbarBodyEl = document.getElementById(target);

  navbarBurgerEl.classList.toggle('is-active');
  navbarBodyEl.classList.toggle('is-active');
};
</script>

<template>
  <FontAwesomeIcon :icon="faWifi" />
  <nav class="level is-mobile py-2">
    <div class="level-left">
      <div class="level-item">World Clock</div>
    </div>

    <div class="level-right">
      <div class="level-item">
        <button class="button" @click="toggleTheme">Toggle Theme</button>
      </div>
    </div>
  </nav>
</template>
