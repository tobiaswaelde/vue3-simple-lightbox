<template>
  <div :class="ui?.index?.wrapper || 'absolute top-2 left-2'">
    <slot name="index" :current="current" :total="total" :text="text">
      <div :class="ui?.index?.base || 'flex flex-row items-center bg-black/40 text-white px-6 py-3 rounded-md'">
        <span :class="ui?.index?.text || 'text-sm leading-4'"> {{ text }} </span>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { LightboxUiProps } from '../types';

const props = defineProps<{
  /** Object to overwrite the default UI components. */
  ui?: LightboxUiProps;
  /** The current item index (0-based) */
  current: number;
  /** The total number of items */
  total: number;
}>();
const slots = defineSlots<{
  /** Custom image index rendering */
  index?: (props: {
    /** The current item index (0-based) */
    current: number;
    /** The total number of items */
    total: number;
    /** The text to display including divider */
    text: string;
  }) => void;
}>();

const text = computed<string>(() => {
  return `${props.current} / ${props.total}`;
});
</script>
