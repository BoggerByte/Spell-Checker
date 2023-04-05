import type { Dictionary, DictionaryEntry } from "../types/dictionary";
import { getFromLocalstorage, setToLocalstorage } from "../utils/localstorage";


const MISTAKES_DICTIONARY_KEY = 'mistakes_dictionary'

function getMistakesDictionary(): Dictionary {
    return getFromLocalstorage<Dictionary>(MISTAKES_DICTIONARY_KEY) || []
}

function pushMistakesDictionary(entries: DictionaryEntry[]): void {
    const mistakesDictionary = getMistakesDictionary()
    const newEntries = entries.filter(entry => !mistakesDictionary.find(oldEntry => oldEntry.word === entry.word))
    mistakesDictionary.push(...newEntries)

    setToLocalstorage(MISTAKES_DICTIONARY_KEY, mistakesDictionary)
}

function clearMistakesDictionary(): void {
    getFromLocalstorage(MISTAKES_DICTIONARY_KEY)
}

export {
    getMistakesDictionary,
    pushMistakesDictionary,
    clearMistakesDictionary
}
