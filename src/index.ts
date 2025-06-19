import type { Plugin } from 'vue';
import type { LightboxPluginOptions } from './types/plugin-options';
import Lightbox from './core/lightbox.vue';

const Vue3SimpleLightbox: Plugin = {
  install(app, options?: LightboxPluginOptions) {
    app.component(options?.name ?? 'lightbox', Lightbox);
  },
};

// CDN compatibility
if (typeof window !== 'undefined') {
  (window as any).Vue3SimpleLightbox = Vue3SimpleLightbox;
}

export default Vue3SimpleLightbox;
export { Lightbox };
export * from './types/index';
export * from './core/index';
