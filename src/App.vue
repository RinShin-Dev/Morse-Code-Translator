<script setup>
import { RouterView } from 'vue-router'
import IconSVG from './components/IconSVG.vue'
import { useMorseSound } from './stores/morseSound';

const morseSound = useMorseSound()

</script>

<template>
  <header class="sticky top-0 z-40">
    <div class="navbar bg-neutral flex justify-between">
      <div class="flex items-center gap-3">
        <IconSVG iconName="morserera" scale="3" size="2rem" />
        <div class="font-morserera">
          <div class="text-2xl">Morserera</div>
          <div class="text-xs opacity-50 whitespace-nowrap">Morse code translator</div>
        </div>
      </div>
      <label class="swap swap-rotate">
        <input type="checkbox" v-model="morseSound.muted" />
        <IconSVG iconName="volume-up" scale="1.5" size="2rem" class="swap-off" />
        <IconSVG iconName="volume-mute" scale="1.5" size="2rem" class="swap-on" />
      </label>
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
