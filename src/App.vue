<script setup>
import { RouterView } from 'vue-router'
import IconSVG from './components/IconSVG.vue'

</script>

<template>
  <header class="sticky top-0 z-40">
    <div class="navbar bg-neutral">
      <div class="flex items-center gap-3">
        <IconSVG iconName="morserera" scale="3" size="2rem" />
        <div class="font-morserera">
          <div class="text-2xl">Morserera</div>
          <div class="text-xs opacity-50 whitespace-nowrap">Morse code translator</div>
        </div>
      </div>
    </div>
  </header>
  <RouterView v-slot="{ Component }">
    <Transition>
      <Component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
