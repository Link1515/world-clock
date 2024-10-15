<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue';
import Fuse from 'fuse.js';
import debounce from 'lodash/debounce';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getAvailableTimezones } from '~/services/timezoneService';

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false
  }
});

const timezones = getAvailableTimezones();

const fuse = new Fuse(timezones);

const searchInput = defineModel({ type: String, default: '' });
const searchInputIsFocus = ref(false);
const searchResult = ref([]);
const resultBoxEl = ref();
const handleSearch = async () => {
  searchResult.value = fuse.search(searchInput.value);
  await nextTick();
  if (resultBoxEl.value) {
    resultBoxEl.value.scrollTo(0, 0);
  }
};
watch(searchInput, debounce(handleSearch, 250, { leading: true }));

const searchResultBoxIsShow = computed(
  () => searchInputIsFocus.value && searchResult.value.length > 0
);

const noResultBoxIsShow = computed(
  () =>
    searchInputIsFocus.value &&
    searchResult.value.length === 0 &&
    searchInput.value !== ''
);

const inputEl = ref();
watch(
  () => props.isShow,
  async () => {
    if (!props.isShow) return;
    await nextTick();
    inputEl.value.focus();
  }
);

const clickResult = result => {
  searchInput.value = result.item;
};
</script>

<template>
  <div class="search-row">
    <div class="search-icon">
      <FontAwesomeIcon :icon="faSearch" />
    </div>
    <input
      ref="inputEl"
      v-model="searchInput"
      @focus="searchInputIsFocus = true"
      @blur="searchInputIsFocus = false"
      class="search-input input"
      type="text"
      placeholder="Seach timezone..."
    />
  </div>

  <div class="result-row">
    <Transition name="fade">
      <ul ref="resultBoxEl" class="result-box box" v-if="searchResultBoxIsShow">
        <li
          class="result"
          :class="{ active: result.item === searchInput }"
          v-for="result in searchResult"
          @click="clickResult(result)"
        >
          {{ result.item }}
        </li>
      </ul>
    </Transition>

    <Transition name="fade">
      <div class="no-result-box box" v-if="noResultBoxIsShow">No result</div>
    </Transition>
  </div>
</template>

<style scoped>
.box {
  padding: 0;
  border-radius: 6px;
}

.search-row {
  position: relative;
}

.search-icon {
  width: 32px;
  height: 32px;
  position: absolute;
  z-index: 10;
  top: 0;
  right: 6px;
  margin: auto;
  bottom: 0;
  display: grid;
  place-items: center;
}

.search-input {
  padding-right: 40px;
}

.result-row {
  position: relative;
}

.result-box {
  position: absolute;
  z-index: 10;
  top: 12px;
  width: 100%;
  max-height: 200px;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.result {
  cursor: pointer;
  padding: 2px 16px;
  transition: background-color 0.3s;
  border-radius: 6px;
  word-wrap: break-word;
}

.result:hover {
  background-color: hsla(
    var(--bulma-text-h),
    var(--bulma-text-s),
    var(--bulma-text-l),
    0.1
  );
}
.result.active {
  background-color: #e2e6fe;
}

.no-result-box {
  padding: 2px 16px;
}
</style>
