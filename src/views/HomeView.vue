<script setup>
import { ref, computed } from 'vue'
import { encode, decode } from '../utils/morse.js'

const mode = ref('encode')
const input = ref('')
const output = computed(() => {
  if (mode.value === 'encode') {
    return encode(input.value)
  } else {
    return decode(input.value)
  }
})

const handleChangeMode = () => {
  if (output.value !== '') {
    input.value = output.value
  }
  mode.value = mode.value === 'encode' ? 'decode' : 'encode'
}

</script>

<template>
  <main class="mt-4">
    <section class="flex flex-col md:flex-row items-center md:justify-center gap-3">
      <div class="w-[90%] md:w-[40%]">
        <div class="text-sm">Input</div>
        <textarea v-model="input"
          :placeholder="mode === 'encode' ? 'Text to encode' : 'Enter morse code to decode. (You can use . and - for morse code, space for character separation, and / for word separation.)'"
          class="textarea textarea-bordered resize-none w-full h-[10rem] border-2 border-b-primary placeholder:text-sm">
        </textarea>
      </div>
      <button
        class="relative bg-secondary h-10 w-36 rounded-lg font-morserera overflow-hidden shadow-[3px_3px_0px] shadow-accent transition active:shadow-[0px_0px_0px] active:translate-x-[3px] active:translate-y-[3px]"
        @click="handleChangeMode">
        <div class="absolute flex inset-0 justify-evenly items-center text-accent">
          <div>Text</div>
          <div class="text-xs">to</div>
          <div>Text</div>
        </div>
        <div :class="mode === 'decode' ? 'translate-x-0' : 'translate-x-[125%]'"
          class="relative w-[45%] h-full bg-primary rounded-lg grid place-items-center transition text-accent">
          <div>Morse</div>
        </div>
      </button>
      <div class="w-[90%] md:w-[40%]">
        <div class="text-sm">Output</div>
        <div
          class="textarea textarea-bordered bg-base-200 text-base-content text-opacity-75 w-full h-[10rem] break-words border-2 border-b-primary">
          {{ output }}
        </div>
      </div>
    </section>
  </main>
</template>
