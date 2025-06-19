import type { DeepPartial } from './util';

export type LightboxUiProps = DeepPartial<{
  backdrop: string;
  content: {
    wrapper: string;
    base: string;
  };
  images: {
    wrapper: string;
    item: string;
    img: string;
  };
  caption: {
    wrapper: string;
    text: string;
  };
  index: {
    wrapper: string;
    base: string;
    text: string;
  };
  close: {
    wrapper: string;
    base: string;
    icon: string;
  };
  prev: {
    wrapper: string;
    base: string;
    icon: string;
  };
  next: {
    wrapper: string;
    base: string;
    icon: string;
  };
}>;
