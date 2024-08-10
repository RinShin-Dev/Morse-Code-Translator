<script setup>
import { ref } from 'vue';

const emits = defineEmits(['btnClick', 'btnDown', 'btnUp', 'btnLeave'])

defineProps({
  width: {
    type: String,
    default: '9rem'
  },
  height: {
    type: String,
    default: '2.5rem'
  }
})

const isTouch = ref(false);

const handleTouchStart = () => {
  isTouch.value = true;
  emits('btnDown');
}

const handleMouseDown = () => {
  if (!isTouch.value) {
    emits('btnDown');
  }
}
</script>

<template>
  <button
    class="relative bg-secondary rounded-lg font-morserera overflow-hidden shadow-[3px_3px_0px] shadow-accent transition active:shadow-[0px_0px_0px] active:translate-x-[3px] active:translate-y-[3px] select-none"
    @click="$emit('btnClick')" @mousedown="handleMouseDown" @mouseup="$emit('btnUp')" @mouseleave="$emit('btnLeave')"
    @touchstart="handleTouchStart" @touchend="$emit('btnUp')" :style="{ width, height }">
    <slot></slot>
  </button>
</template>
