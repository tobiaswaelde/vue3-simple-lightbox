import { HTMLAttributes } from 'vue';
import type { DeepPartial } from './util';

export type LightboxUiProps = DeepPartial<{
  backdrop: HTMLAttributes['class'];
  content: {
    wrapper: HTMLAttributes['class'];
    base: HTMLAttributes['class'];
  };
  images: {
    wrapper: HTMLAttributes['class'];
    item: HTMLAttributes['class'];
    img: HTMLAttributes['class'];
  };
  caption: {
    wrapper: HTMLAttributes['class'];
    text: HTMLAttributes['class'];
  };
  index: {
    wrapper: HTMLAttributes['class'];
    base: HTMLAttributes['class'];
    text: HTMLAttributes['class'];
  };
  close: {
    wrapper: HTMLAttributes['class'];
    base: HTMLAttributes['class'];
    icon: HTMLAttributes['class'];
  };
  prev: {
    wrapper: HTMLAttributes['class'];
    base: HTMLAttributes['class'];
    icon: HTMLAttributes['class'];
  };
  next: {
    wrapper: HTMLAttributes['class'];
    base: HTMLAttributes['class'];
    icon: HTMLAttributes['class'];
  };
}>;
