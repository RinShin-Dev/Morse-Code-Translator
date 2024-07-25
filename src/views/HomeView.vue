<script setup>
import { ref, computed } from 'vue'
import { encode, decode } from '../utils/morse.js'

const mode = ref('encode','decode')
const input = ref('')
const output = computed(() => {
  //TODO: Implement the morse code translation
  if (input.value === '') return mode.value + 'd output'
  if (mode.value === 'encode') {
    return encode(input.value)
  } else {
    return decode(input.value)
  }
})

const handleChangeMode = () => {
  mode.value = mode.value === 'encode' ? 'decode' : 'encode'
}

</script>

<template>
  <main>
    <h1 class="text-xl">Morserera</h1>
    <p>Morse code translator</p>
    <div class="flex items-center gap-3">
      <textarea v-model="input"
        :placeholder="mode === 'encode' ? 'Input text to encode' : 'Input morse code to decode (use / for word separation)'"
        class="textarea textarea-bordered resize-none w-[25rem] h-[10rem]"></textarea>
      <button class="btn" @click="handleChangeMode">
        <div class="flex flex-col gap-1">
          <div>Switch Mode</div>
          <div class="text-xs">Now is <span class="text-red-400">{{ mode }}</span> mode</div>
        </div>
      </button>
      <div
        class="textarea textarea-bordered bg-base-200 text-base-content text-opacity-75 w-[25rem] h-[10rem] break-words">
        {{ output }}
      </div>
    </div>
  </main>
</template>
