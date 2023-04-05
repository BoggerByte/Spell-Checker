interface DictionaryEntry {
    word: string,
    blanked: string
}

type Dictionary = DictionaryEntry[]

export {
    type DictionaryEntry,
    type Dictionary
}
