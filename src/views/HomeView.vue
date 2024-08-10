<script setup>
import { ref, computed, watch } from 'vue'
import { encode, decode } from '../utils/morse.js'
import { useMorseSound } from '@/stores/morseSound.js';
import CheeseButton from '@/components/CheeseButton.vue';
import IconSVG from '@/components/IconSVG.vue';

const morseSound = useMorseSound()
const mode = ref('encode')
const originalInput = ref('')
const input = ref('')

watch(input, () => {
  if (mode.value === 'encode') {
    originalInput.value = input.value
    return
  }
  input.value = input.value.replace(/\s/g, '•')
  originalInput.value = input.value.replace(/•/g, ' ')
})

const output = computed(() => {
  if (mode.value === 'encode') {
    return encode(originalInput.value)
  } else {
    return decode(originalInput.value)
  }
})

const handleChangeMode = () => {
  if (output.value !== '') {
    input.value = output.value
  }
  mode.value = mode.value === 'encode' ? 'decode' : 'encode'
}

const handleTypeMorse = (e) => {
  console.log(e.key)
  if (mode.value === 'encode') {
    morseSound.keyPress()
    return
  }
  if (mode.value === 'decode') {
    if (e.key === '/') {
      e.preventDefault()
      input.value += ' / '
    }
    morseSound.beep(e.key)
  }
}

const textArea = ref(null)
const handleHotKeyClick = (key) => {
  input.value += key
  morseSound.beep(key)
}

let deletePressed = false
let deleteTimeout = null
const handleDeleteHotKeyDown = () => {
  deletePressed = true
  input.value = input.value.slice(0, -1)
  morseSound.keyPress()

  if (deleteTimeout) {
    clearTimeout(deleteTimeout)
  }
  deleteTimeout = setTimeout(() => {
    const deleteInterval = setInterval(() => {
      if (deletePressed) {
        if (input.value === '') {
          clearInterval(deleteInterval)
          return
        }
        input.value = input.value.slice(0, -1)
        morseSound.keyPress()
      } else {
        clearInterval(deleteInterval)
      }
    }, 50)
  }, 500)
}

const handleDeleteHotKeyUp = () => {
  deletePressed = false
}

/**
 * 
 * @param e {ClipboardEvent}
 */
const handleInputCopy = (e) => {
  e.preventDefault()
  const start = e.target.selectionStart
  const end = e.target.selectionEnd
  const selectedText = originalInput.value.substring(start, end)
  console.log(selectedText)
  e.clipboardData.setData('text/plain', selectedText)
}
</script>

<template>
  <main class="mt-4">
    <section class="flex flex-col md:flex-row items-center md:justify-center gap-3">
      <div class="w-[90%] md:w-[40%] h-[12rem] flex flex-col gap-1">
        <div class="flex-auto flex flex-col">
          <div class="text-sm flex-none flex justify-between items-baseline">
            <div>Input</div>
            <div v-show="mode === 'decode'" class="text-xs opacity-50">space will show as "•"</div>
          </div>
          <textarea v-model="input" @keydown="handleTypeMorse($event)" ref="textArea"
            :placeholder="mode === 'encode' ? 'Text to encode' : 'Enter morse code to decode. (You can use . and - for morse code, space for character separation, and / for word separation.)'"
            @copy="handleInputCopy"
            class="textarea textarea-bordered resize-none w-full h-full border-2 border-b-primary placeholder:text-sm caret-primary flex-auto overflow-y-auto">
          </textarea>
        </div>
        <div v-show="mode === 'decode'" class="flex-none flex justify-between">
          <div class="flex gap-[0.1rem]">
            <CheeseButton @btnClick="handleHotKeyClick('.')" width="2rem" height="2rem">
              <span class="text-accent">.</span>
            </CheeseButton>
            <CheeseButton @btnClick="handleHotKeyClick('-')" width="2rem" height="2rem">
              <span class="text-accent">-</span>
            </CheeseButton>
          </div>
          <div class="flex gap-[0.1rem]">
            <CheeseButton @btnClick="handleHotKeyClick(' ')" width="5rem" height="2rem">
              <span class="text-accent">Space</span>
            </CheeseButton>
            <CheeseButton @btnClick="handleHotKeyClick(' / ')" width="2rem" height="2rem">
              <span class="text-accent">/</span>
            </CheeseButton>
            <CheeseButton @btnDown="handleDeleteHotKeyDown" @btnUp="handleDeleteHotKeyUp"
              @btnLeave="handleDeleteHotKeyUp" width="2rem" height="2rem">
              <IconSVG iconName="backspace" class="text-accent" size="2rem" />
            </CheeseButton>
          </div>
        </div>
      </div>
      <CheeseButton @btnClick="handleChangeMode">
        <div class="absolute flex w-full h-full justify-evenly items-center text-accent">
          <div>Text</div>
          <div class="text-xs">to</div>
          <div>Text</div>
        </div>
        <div :class="mode === 'decode' ? 'translate-x-0' : 'translate-x-[125%]'"
          class="relative w-[45%] h-full bg-primary rounded-lg grid place-items-center transition text-accent">
          <div>Morse</div>
        </div>
      </CheeseButton>
      <div class="w-[90%] md:w-[40%] h-[12rem] flex flex-col">
        <div class="text-sm flex-none">Output</div>
        <div
          class="textarea textarea-bordered bg-base-200 text-base-content text-opacity-75 w-full h-full border-2 border-b-primary flex flex-auto overflow-y-auto">
          <div class="break-words">{{ output }}</div>
        </div>
      </div>
    </section>
  </main>
</template>
