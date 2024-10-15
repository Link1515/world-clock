import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const projectName = 'world-clock';

export default defineConfig(({ mode }) => {
  const base = mode === 'production' ? `/${projectName}/` : '/';

  return {
    base,
    plugins: [
      vue(),
      {
        name: 'html-transform',
        transformIndexHtml: {
          order: 'pre',
          handler(html) {
            if (mode !== 'production') return html;

            return html.replace(
              /<meta property="og:image" content="(.*?)" \/>/,
              `<meta property="og:image" content="/${projectName}$1" />`
            );
          }
        }
      }
    ],
    resolve: {
      alias: {
        '~': '/src'
      }
    }
  };
});
