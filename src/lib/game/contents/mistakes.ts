import { Dictionary } from "$lib/game/dictionary";


const MISTAKES_DICTIONARY_NAME = 'mistakes'



let mistakes: Dictionary
try {
    const key = Dictionary.getStorageKey(MISTAKES_DICTIONARY_NAME)
    mistakes = Dictionary.loadFromStorage(key)
} catch (ignored) {
    mistakes = new Dictionary(MISTAKES_DICTIONARY_NAME, [])
}

export default mistakes
