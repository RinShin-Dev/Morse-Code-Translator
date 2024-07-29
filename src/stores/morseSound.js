import { defineStore } from 'pinia'
import SoundController from '@/utils/classes/SoundController'
import { ref, watch } from 'vue'

export const useMorseSound = defineStore('morseSound', () => {
  const soundController = new SoundController()
  const currentSfxVolume = ref(50)
  const muted = ref(false)

  watch(currentSfxVolume, (value) => {
    soundController.setSFXVolume(value)
  })

  watch(muted, (value) => {
    soundController.setMute('sfx', value, currentSfxVolume.value)
  })

  /**
   * Play a short beep sound.
   */
  function shortBeep() {
    soundController.playSFX('/sounds/shortBeep.wav')
  }

  /**
   * Play a long beep sound.
   */
  function longBeep() {
    soundController.playSFX('/sounds/longBeep.wav')
  }

  /**
   * Play a key press sound.
   */
  function keyPress() {
    soundController.playSFX('/sounds/keyPress.wav')
  }

  /**
   * Play a beep sound based on the morse character.
   * @param {string} morseChar - The morse character to beep. It can be '.' or '-'.
   *
   * @example
   * const morseSound = useMorseSound()
   * morseSound.beep('.') // Play a short beep sound
   * morseSound.beep('-') // Play a long beep sound
   * morseSound.beep(' ') // Do nothing
   */
  function beep(morseChar) {
    if (morseChar === '.') {
      shortBeep()
    } else if (morseChar === '-') {
      longBeep()
    } else {
      keyPress()
    }
  }

  return { beep, shortBeep, longBeep, keyPress, currentSfxVolume, muted }
})
