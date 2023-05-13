interface DictionaryEntry {
	word: string
	blanked: string
}

interface StorableDictionary {
	readonly name: string
	entries: DictionaryEntry[]
}

export { type DictionaryEntry, type StorableDictionary }
