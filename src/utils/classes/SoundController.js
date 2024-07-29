const DEFAULT_GAIN = 0.5 // 1

/**
 * SoundController class used to control the sound (BGM and SFX).
 * @constructor Create a SoundController object.
 */
export default class SoundController {
  constructor() {
    this.audioContext = new AudioContext()
    this.bgmGainNode = this.audioContext.createGain()
    this.sfxGainNode = this.audioContext.createGain()

    this.bgmGainNode.connect(this.audioContext.destination)
    this.sfxGainNode.connect(this.audioContext.destination)

    this.bgmGainNode.gain.value = DEFAULT_GAIN
    this.sfxGainNode.gain.value = DEFAULT_GAIN

    this.soundEffects = {}
  }
  // Object to store pre-loaded audio buffers

  async preloadAudio(soundPath) {
    const response = await fetch(soundPath)
    const arrayBuffer = await response.arrayBuffer()
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
    this.soundEffects[soundPath] = audioBuffer
  }

  /**
   * Play the background music.
   * @param {string} soundPath - The path of the sound file.
   */
  async playBGM(soundPath) {
    try {
      const audio = new Audio(soundPath)
      const source = this.audioContext.createMediaElementSource(audio)
      source.connect(this.bgmGainNode)
      audio.loop = true
      await audio.play()
      this.audioContext.resume()
    } catch (error) {
      console.error('Error playing BGM:', error)
    }
  }

  /**
   * Play the sound effect.
   * @param {string} soundPath - The path of the sound file.
   */
  async playSFX(soundPath) {
    try {
      if (!this.soundEffects[soundPath]) {
        await this.preloadAudio(soundPath) // Preload if not already loaded
      }

      const buffer = this.soundEffects[soundPath]
      const source = this.audioContext.createBufferSource() // Reuse a single source node
      source.buffer = buffer
      source.connect(this.sfxGainNode) // Connect to pre-connected sourceNode

      source.start(0)
      this.audioContext.resume()
    } catch (error) {
      console.error('Error playing SFX:', error)
    }
  }

  /**
   * Set the volume of the background music.
   * @param {number} volume - The volume of the sound.
   */
  setBGMVolume(volume) {
    this.bgmGainNode.gain.value = volume / 100
  }

  /**
   * Set the volume of the sound effect.
   * @param {number} volume - The volume of the sound.
   */
  setSFXVolume(volume) {
    this.sfxGainNode.gain.value = volume / 100
  }

  /**
   * Set the mute state of the sound.
   * @param {string} soundType - The type of the sound (bgm or sfx).
   * @param {boolean} muteState - The mute state of the sound.
   * @param {number} currentVolume - The current volume of the sound.
   * @returns {void}
   * @example
   * soundController.setMute('bgm', true, 100)
   * soundController.setMute('sfx', false, 50)
   * soundController.setMute('bgm', true, 0)
   * soundController.setMute('sfx', false, 0)
   */
  setMute(soundType, muteState, currentVolume) {
    if (soundType === 'bgm') {
      this.bgmGainNode.gain.value = muteState ? 0 : currentVolume / 100
    } else {
      this.sfxGainNode.gain.value = muteState ? 0 : currentVolume / 100
    }
  }

  /**
   * Clear the background music.
   */
  clearBGM() {
    this.currentBgmSource?.disconnect()
  }
}
