import { Plugin } from 'vue';
import { SimpleLightboxPluginOptions } from './types/plugin-options';
// types
import { LightboxItem } from './types/item';
import { LightboxUiProps } from './types/ui';
// components
import Lightbox from './core/simple-lightbox.vue';

const Vue3SimpleLightbox: Plugin = {
  install(app, options?: SimpleLightboxPluginOptions) {
    app.component(options?.name ?? 'simple-lightbox', Lightbox);
  },
};

// CDN compatibility
if (typeof window !== 'undefined') {
  (window as any).Vue3SimpleLightbox = Vue3SimpleLightbox;
}

export default Vue3SimpleLightbox;
export { LightboxItem, LightboxUiProps, Lightbox };
export * from './types/index';
export * from './core/index';
