<template>
  <div
    :class="ui?.content?.base ?? 'absolute inset-0 text-white flex flex-row items-center'"
    @click="$emit('close', $event)"
  >
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis laudantium repudiandae dolore quos ex quia maiores
    iusto, neque animi magnam consequatur at totam tempora maxime amet, commodi debitis! Laborum, eos?
  </div>
</template>

<script setup lang="ts">
import type { LightboxUiProps } from '../types';

const props = defineProps<{
  ui?: LightboxUiProps;
}>();
const emit = defineEmits<{
  (event: 'close', payload: MouseEvent): void;
}>();
</script>
