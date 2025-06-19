# Vue3 Simple Lightbox

![Build](https://github.com/<USER>/<REPO>/actions/workflows/test-build.yml/badge.svg)
![Publish](https://github.com/<USER>/<REPO>/actions/workflows/publish.yml/badge.svg)

A simple lightbox component for [Vue](https://vuejs.org/).

## Installation
#### Install using yarn
```sh
yarn add vue3-simple-lightbox
```

#### Install using NPM
```sh
npm install vue3-simple-lightbox
```

## Basic Usage
```vue
<template>
  <!-- shows a preview grid of the images. The clicked image will be opened in the lightbox. -->
  <main class="flex flex-col items-center py-8">
    <div class="max-w-3xl grid grid-cols-3 gap-4">
      <button v-for="(item, index) in items" :key="item.id" @click="handleOpen(index)" class="cursor-pointer">
        <img :src="item.src" alt="" class="aspect-video" />
      </button>
    </div>
  </main>

  <!-- Lightbox with custom icons -->
  <Lightbox :items="items" v-model:open="open" v-model:index="index">
    <template #closeIcon>
      <IconX class="size-6" />
    </template>
    <template #prevIcon>
      <IconChevronLeft class="size-6" />
    </template>
    <template #nextIcon>
      <IconChevronRight class="size-6" />
    </template>
  </Lightbox>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { Lightbox, type LightboxItem } from 'vue3-simple-lightbox';
import 'vue3-simple-lightbox/vue3-simple-lightbox.css';

type Item = LightboxItem & { id: string; src: string };

// defines an array of random images
const items = ref<Item[]>([
  { id: crypto.randomUUID(), src: `https://picsum.photos/seed/${crypto.randomUUID()}/1280/720` },
  { id: crypto.randomUUID(), src: `https://picsum.photos/seed/${crypto.randomUUID()}/1280/720`, caption: 'Image 2' },
  { id: crypto.randomUUID(), src: `https://picsum.photos/seed/${crypto.randomUUID()}/1280/720` },
  { id: crypto.randomUUID(), src: `https://picsum.photos/seed/${crypto.randomUUID()}/1280/720` },
  { id: crypto.randomUUID(), src: `https://picsum.photos/seed/${crypto.randomUUID()}/1280/720` },
  { id: crypto.randomUUID(), src: `https://picsum.photos/seed/${crypto.randomUUID()}/1280/720` },
  { id: crypto.randomUUID(), src: `https://picsum.photos/seed/${crypto.randomUUID()}/1280/720` },
  { id: crypto.randomUUID(), src: `https://picsum.photos/seed/${crypto.randomUUID()}/1280/720` },
  { id: crypto.randomUUID(), src: `https://picsum.photos/seed/${crypto.randomUUID()}/1280/720` },
]);

// the index of the current image
const index = ref<number>(0);
// the state of the lightbox
const open = ref<boolean>(false);

// opens the clicked image
const handleOpen = (value: number) => {
  index.value = value;
  open.value = true;
};
</script>
```

## API

### Props

| Prop    | Default                 | Type                                         |
| ------- | ----------------------- | -------------------------------------------- |
| `ui`    | see [Theming](#theming) | `LightboxUiProps`                            |
| `items` |                         | `LightboxItem[]` <br/> The items to display. |

#### LightboxItem
You can define items in two different ways:

1. Provide only the image URL as string
```vue
<Lightbox 
  :items="[
    'https://picsum.photos/1280/720',
    'https://picsum.photos/1280/720',
    'https://picsum.photos/1280/720',
  ]"
/>
```

2. Provide an object with optional caption & alt text
```vue
<Lightbox 
  :items="[
    { src: 'https://picsum.photos/1280/720', alt: 'image 1', caption: 'Image Caption 1' },
    { src: 'https://picsum.photos/1280/720', alt: 'image 2', caption: 'Image Caption 2' },
    { src: 'https://picsum.photos/1280/720', alt: 'image 3', caption: 'Image Caption 3' },
  ]"
/>
```

### Slots
| Slot        | Type                                                |
| ----------- | --------------------------------------------------- |
| `index`     | `{ current: number; total: number; text: string; }` |
| `close`     | `{ click: () => void; }`                            |
| `closeIcon` | `{  }`                                              |
| `prev`      | `{ visible: boolean; click: () => void; }`          |
| `prevIcon`  | `{  }`                                              |
| `next`      | `{ visible: boolean; click: () => void; }`          |
| `nextIcon`  | `{  }`                                              |
| `caption`   | `{ text: string; }`                                 |
| `item`      | `{ item: LightboxItem; index: number; }`            |

### Theming
```ts
const defaultUi: LightboxUiProps = {
  backdrop: 'fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md select-none',
  content: {
    wrapper: 'relative size-full z-40 overscroll-none',
    base: 'absolute inset-0 text-white flex flex-row items-center',
  },
  images: {
    wrapper: 'flex items-center overflow-x-auto snap-x snap-mandatory scroll-smooth w-full px-1 sm:px-4 lg:px-16 !cursor-default',
    item: 'flex-shrink-0 size-full flex items-center justify-center snap-center mx-1 sm:mx-4 lg:mx-16',
    img: 'max-h-[80vh] max-w-full object-contain rounded-md',
  },
  caption: {
    wrapper: 'absolute bottom-0 left-0 w-full',
    text: 'text-center bg-black/40 text-white px-4 py-2',
  },
  index: {
    wrapper: 'absolute top-2 left-2',
    base: 'flex flex-row items-center bg-black/40 text-white px-6 py-3 rounded-md',
    text: 'text-sm leading-4',
  },
  close: {
    wrapper: 'absolute top-2 right-2',
    base: 'bg-black/40 hover:bg-black/60 active:bg-black/80 text-white size-8 sm:size-10 lg:size-12 flex items-center justify-center rounded-md cursor-pointer transition-all duration-150',
    icon: 'size-6',
  },
  prev: {
    wrapper: 'absolute top-1/2 -translate-y-1/2 left-2',
    base: 'bg-black/40 hover:bg-black/60 active:bg-black/80 text-white size-8 sm:size-10 lg:size-12 flex items-center justify-center rounded-md cursor-pointer transition-all duration-150',
    icon: 'size-6',
  },
  next: {
    wrapper: 'absolute top-1/2 -translate-y-1/2 right-2',
    base: 'bg-black/40 hover:bg-black/60 active:bg-black/80 text-white size-8 sm:size-10 lg:size-12 flex items-center justify-center rounded-md cursor-pointer transition-all duration-150',
    icon: 'size-6',
  },
}
```