const morseList = {
    A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....',
    I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.',
    Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
    Y: '-.--', Z: '--..', 0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-',
    5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.', '.': '.-.-.-', ',': '--..--',
    '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
    '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-',
    '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.', ' ': '/'
}

/**
 * This function use to convert text to morse code
 * @param {string} text 
 * @returns
 */
export function encode(text) {
    const upperCaseText = text.toUpperCase()
    const result = []
    for (const c of upperCaseText) {
        result.push(morseList[c])
    }
    return result.join(' ')
}

/**
 * This function use to convert morse code to text.
 * @param {string} morse
 * @returns 
 */
export function decode(morse) {
    const morses = morse.split(' ')
    let result = ''

    for (const m of morses) {
        result += Object.keys(morseList).find(key => morseList[key] === m) || ''
    }

    return result
}
