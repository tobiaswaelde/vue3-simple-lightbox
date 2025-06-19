<template>
  <button
    :class="
      props.class ||
      'bg-black/40 hover:bg-black/60 active:bg-black/80 text-white size-8 sm:size-10 lg:size-12 flex items-center justify-center rounded-md cursor-pointer transition-all duration-150'
    "
    @click="$emit('click', $event)"
  >
    <slot name="icon"> </slot>
  </button>
</template>

<script setup lang="ts">
import { HTMLAttributes } from 'vue';

const props = defineProps<{
  /** Class to overwrite default button styles */
  class?: HTMLAttributes['class'];
}>();
defineEmits<{
  (event: 'click', payload: MouseEvent): void;
}>();
const slots = defineSlots<{
  icon: () => void;
}>();
</script>
