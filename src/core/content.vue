<template>
  <div
    :class="ui?.content?.base || 'absolute inset-0 text-white flex flex-row items-center'"
    @click="$emit('close', $event)"
  >
    <!-- images -->
    <div
      ref="scroller"
      class="lightbox-scroller"
      :class="
        ui?.images?.wrapper ||
        'flex items-center overflow-x-auto snap-x snap-mandatory scroll-smooth w-full px-1 sm:px-4 lg:px-16 !cursor-default'
      "
      @mousedown.prevent="onMouseDown"
      @mouseup.prevent="onMouseUp"
      @mouseleave.prevent="onMouseLeave"
      @mousemove.prevent="onMouseMove"
      @click.stop
    >
      <template v-for="(item, idx) in items" :key="idx">
        <slot name="item" :item="item" :index="idx">
          <div
            :class="
              ui?.images?.item ||
              'flex-shrink-0 size-full flex items-center justify-center snap-center mx-1 sm:mx-4 lg:mx-16'
            "
          >
            <img
              :src="typeof item === 'string' ? item : item.src"
              :alt="(typeof item !== 'string' && item.alt) || `Image ${idx + 1}`"
              :class="ui?.images?.img || 'max-h-[80vh] max-w-full object-contain rounded-md'"
            />
          </div>
        </slot>
      </template>
    </div>

    <!-- caption -->
    <div v-if="captionText" :class="ui?.caption?.wrapper || 'absolute bottom-0 left-0 w-full'">
      <slot name="caption" :text="captionText">
        <div :class="ui?.caption?.text || 'text-center bg-black/40 text-white px-4 py-2'">
          <span>{{ captionText }}</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue';
import type { LightboxItem, LightboxUiProps } from '../types';

const props = defineProps<{
  /** Object to overwrite the default UI components. */
  ui?: LightboxUiProps;
  /** Array of items to display in the lightbox. */
  items: LightboxItem[];
}>();
defineEmits<{
  (event: 'close', payload: MouseEvent): void;
}>();
/** The index of the current active item. */
const index = defineModel<number>('index', { required: true });
defineSlots<{
  item?: (props: { item: LightboxItem; index: number }) => void;
  caption?: (props: { text: string }) => void;
}>();

const captionText = computed<string | null>(() => {
  const item = props.items[index.value];
  if (typeof item === 'string') return null;
  return item.caption || null;
});

//#region scrolling
const scroller = useTemplateRef<HTMLDivElement>('scroller');
const width = computed<number>(() => scroller.value?.clientWidth ?? 0);

const handleScroll = () => {
  if (!scroller.value || width.value === 0) return;
  const scrollLeft = scroller.value.scrollLeft;
  index.value = Math.round(scrollLeft / width.value);
};

watch(scroller, (newScroller, oldScroller) => {
  if (newScroller && width.value) {
    newScroller.scrollTo({
      left: index.value * width.value,
      behavior: 'instant',
    });
  }

  oldScroller?.removeEventListener('scroll', handleScroll);
  newScroller?.addEventListener('scroll', handleScroll);
});
//#endregion

//#region drag & drop
const isDragging = ref<boolean>(false);
const startX = ref<number>(0);
const scrollLeft = ref<number>(0);

const onMouseDown = (e: MouseEvent) => {
  if (!scroller.value) return;
  isDragging.value = true;
  startX.value = e.pageX - scroller.value.offsetLeft;
  scrollLeft.value = scroller.value.scrollLeft;
  scroller.value.classList.add('dragging');
};

const onMouseLeave = () => {
  isDragging.value = false;
  scroller.value?.classList.remove('dragging');
};

const onMouseUp = () => {
  isDragging.value = false;
  scroller.value?.classList.remove('dragging');
};

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || !scroller.value) return;
  e.preventDefault();
  const x = e.pageX - scroller.value.offsetLeft;
  const walk = x - startX.value;

  if (Math.abs(walk) < 100) return; // ignore small movements
  const scroll = walk > 0 ? width.value : width.value * -1;
  scroller.value.scrollLeft = scrollLeft.value - scroll;
};
//#endregion

//#region actions
/**
 * Scroll to prev item.
 */
const handlePrev = () => {
  if (!width.value || !scroller.value) return;
  scroller.value.scrollBy({
    left: -width.value,
    behavior: 'smooth',
  });
};

/**
 * Scroll to next item.
 */
const handleNext = () => {
  if (!width.value || !scroller.value) return;
  scroller.value.scrollBy({
    left: width.value,
    behavior: 'smooth',
  });
};

defineExpose({ handlePrev, handleNext });
//#endregion
</script>

<style lang="scss" scoped>
.lightbox-scroller {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}
.lightbox-scroller::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.lightbox-scroller.dragging {
  cursor: grabbing;
  user-select: none;
}
.lightbox-scroller {
  cursor: grab;
}
</style>
