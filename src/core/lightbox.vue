<template>
  <div
    v-if="open"
    :class="
      ui?.backdrop ?? 'fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md select-none'
    "
    :tabindex="0"
    :aria-modal="true"
    role="dialog"
  >
    <div :class="ui?.content?.wrapper ?? 'relative size-full z-40 overscroll-none'">
      <Content :ui="ui" @close="handleClose" />
    </div>
  </div>
</template>

<script setup lang="ts">
import '../assets/main.css';
import { computed, useTemplateRef } from 'vue';
import type { LightboxUiProps, LightboxItem } from '../types';
import Content from './content.vue';

const props = defineProps<{
  /**
   * Object to overwrite the default UI components.
   */
  ui?: LightboxUiProps;

  /**
   * Array of items to display in the lightbox.
   */
  items: LightboxItem[];
}>();

/** Controls the open state of the lightbox */
const open = defineModel<boolean>('open', { default: false });

/** Controls the current active item */
const index = defineModel<number>('index', { default: 0 });

defineSlots<{
  /**
   * Displays the index of the current item and number of total items.
   */
  index?: (props: {
    /** The current item index (0-based) */
    current: number;
    /** The total number of items */
    total: number;
  }) => void;
  close?: (props: { click: () => void }) => void;
  closeIcon?: () => void;
  prev?: (props: { visible: boolean; click: () => void }) => void;
  prevIcon?: () => void;
  next?: (props: { visible: boolean; click: () => void }) => void;
  nextIcon?: () => void;
  caption?: (props: { text: string }) => void;
  item?: (props: { item: LightboxItem; index: number }) => void;
}>();

const scroller = useTemplateRef<HTMLDivElement>('scroller');

//#region computed values
/** The width of the scroll container. */
const width = computed<number>(() => scroller.value?.clientWidth || 0);

/** Visibility of the 'Prev' button */
const prevButtonVisible = computed<boolean>(() => index.value > 0);

/** Visibility of the 'Next' button */
const nextButtonVisible = computed<boolean>(() => index.value < props.items.length - 1);

/** The caption of the current item being displayed (if available) */
const captionText = computed<string | null>(() => {
  const item = props.items[index.value];
  if (typeof item === 'string') return null;
  return item.caption || null;
});
//#endregion

//#region actions
const handleClose = () => {
  open.value = false;
};

const handlePrev = () => {
  if (!width.value) return;
  scroller.value?.scrollBy({ left: -width.value, behavior: 'smooth' });
};

const handleNext = () => {
  if (!width.value) return;
  scroller.value?.scrollBy({ left: width.value, behavior: 'smooth' });
};
//#endregion
</script>
