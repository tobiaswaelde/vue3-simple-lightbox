<template>
  <main class="flex flex-col items-center py-8">
    <div class="max-w-3xl grid grid-cols-3 gap-4">
      <button v-for="(item, index) in items" :key="item.id" @click="handleOpen(index)" class="cursor-pointer">
        <img :src="item.src" alt="" class="aspect-video" />
      </button>
    </div>

    <!-- <Lightbox :items="items" v-model:open="open" v-model:index="index" /> -->
    <Lightbox
      :items="items"
      v-model:open="open"
      v-model:index="index"
      :ui="{
        // backdrop: 'bg-red-500',
      }"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Lightbox, type LightboxItem } from '../../src/index';
import '../../dist/vue3-simple-lightbox.css';

type Item = LightboxItem & { id: string; src: string };

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

const index = ref<number>(0);
const open = ref<boolean>(false);

const handleOpen = (value: number) => {
  index.value = value;
  open.value = true;
};
</script>
