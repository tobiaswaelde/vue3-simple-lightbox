<template>
  <div
    v-if="open"
    :class="
      ui?.backdrop || 'fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md select-none'
    "
    :tabindex="0"
    :aria-modal="true"
    role="dialog"
  >
    <div :class="ui?.content?.wrapper || 'relative size-full z-40 overscroll-none'">
      <Content ref="content" :ui="ui" :items="items" @close="handleClose" v-model:index="index">
        <template #item="slotProps">
          <slot name="item" v-bind="slotProps"></slot>
        </template>
        <template #caption="slotProps">
          <slot name="caption" v-bind="slotProps"></slot>
        </template>
      </Content>

      <ImageIndex :ui="ui" :current="index + 1" :total="items.length">
        <template #index="slotProps">
          <slot name="index" v-bind="slotProps"></slot>
        </template>
      </ImageIndex>

      <!-- close button -->
      <div :class="ui?.close?.wrapper || 'absolute top-2 right-2'">
        <slot name="close" :click="handleClose">
          <Button :class="ui?.close?.base" @click="handleClose">
            <template #icon>
              <slot name="closeIcon">
                <span :class="ui?.close?.icon || 'size-6'"></span>
              </slot>
            </template>
          </Button>
        </slot>
      </div>

      <!-- prev button -->
      <div :class="ui?.prev?.wrapper || 'absolute top-1/2 -translate-y-1/2 left-2'">
        <slot name="prev" :visible="prevButtonVisible" :click="handlePrev">
          <Button v-show="prevButtonVisible" :class="ui?.prev?.base" @click="handlePrev">
            <template #icon>
              <slot name="prevIcon">
                <span :class="ui?.prev?.icon || 'size-6'">&lt;</span>
              </slot>
            </template>
          </Button>
        </slot>
      </div>

      <!-- next button -->
      <div :class="ui?.next?.wrapper || 'absolute top-1/2 -translate-y-1/2 right-2'">
        <slot name="next" :visible="nextButtonVisible" :click="handleNext">
          <Button v-show="nextButtonVisible" :class="ui?.next?.base" @click="handleNext">
            <template #icon>
              <slot name="nextIcon">
                <span :class="ui?.next?.icon || 'size-6'">&gt;</span>
              </slot>
            </template>
          </Button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '../assets/main.css';
import { computed, ref } from 'vue';
import type { LightboxUiProps, LightboxItem } from '../types';
import Content from './content.vue';
import ImageIndex from './image-index.vue';
import Button from './button.vue';

const props = defineProps<{
  /** Object to overwrite the default UI components. */
  ui?: LightboxUiProps;
  /** Array of items to display in the lightbox. */
  items: LightboxItem[];
}>();

/** Controls the open state of the lightbox */
const open = defineModel<boolean>('open', { default: false });

/** Controls the current active item */
const index = defineModel<number>('index', { default: 0 });

defineSlots<{
  /** Custom image index rendering */
  index?: (props: {
    /** The current item index (0-based) */
    current: number;
    /** The total number of items */
    total: number;
    /** The text to display including divider */
    text: string;
  }) => void;
  /** Custom close button rendering */
  close?: (props: {
    /** Function to call when the close button is clicked */
    click: () => void;
  }) => void;
  /** Close button icon */
  closeIcon?: () => void;
  /** Custom prev button rendering */
  prev?: (props: {
    /** Whether the prev button is visible */
    visible: boolean;
    /** Function to call when the prev button is clicked */
    click: () => void;
  }) => void;
  /** Prev button icon */
  prevIcon?: () => void;
  /** Custom next button rendering */
  next?: (props: {
    /** Whether the next button is visible */
    visible: boolean;
    /** Function to call when the next button is clicked */
    click: () => void;
  }) => void;
  /** Next button icon */
  nextIcon?: () => void;
  /** Custom caption rendering */
  caption?: (props: {
    /** The caption text for the current item */
    text: string;
  }) => void;
  /** Custom item rendering */
  item?: (props: {
    /** The current item being displayed */
    item: LightboxItem;
    /** The index of the current item */
    index: number;
  }) => void;
}>();

const content = ref<InstanceType<typeof Content>>();

/** Visibility of the 'Prev' button */
const prevButtonVisible = computed<boolean>(() => index.value > 0);
/** Visibility of the 'Next' button */
const nextButtonVisible = computed<boolean>(() => index.value < props.items.length - 1);

//#region actions
const handleClose = () => {
  open.value = false;
};

const handlePrev = () => {
  content.value?.handlePrev();
};

const handleNext = () => {
  content.value?.handleNext();
};
//#endregion
</script>
