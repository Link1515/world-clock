import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  const base = mode === 'production' ? '/world-clock/' : '/';

  return {
    base,
    plugins: [vue()],
    resolve: {
      alias: {
        '~': '/src'
      }
    }
  };
});
