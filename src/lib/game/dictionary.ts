import type { StorableDictionary, DictionaryEntry } from "$lib/game/types/Dictionary";
import { getFromLocalstorage, setToLocalstorage } from "$lib/utils/localstorage";


const DICTIONARY_PREFIX = 'dictionary'


class Dictionary implements StorableDictionary {
    readonly name: string
    entries: DictionaryEntry[]

    public static getStorageKey(name: string): string {
        return DICTIONARY_PREFIX + '_' + name
    }

    public static loadFromStorage(storageKey: string): Dictionary {
        const storableDictionary = getFromLocalstorage<StorableDictionary>(storageKey)
        if (storableDictionary === null) {
            throw new ReferenceError('storable dictionary is null')
        }

        return new this(storableDictionary.name, storableDictionary.entries)
    }

    constructor(name: string, entries: DictionaryEntry[]) {
        this.name = name
        this.entries = entries
    }

    public saveToStorage(): void {
        const key = Dictionary.getStorageKey(this.name)
        setToLocalstorage(key, {
            name: this.name,
            entries: this.entries
        })
    }
}


class Dictionaries {
    public static loadLocalDictionaries(): Dictionary[] {
        let dictionaries: Dictionary[] = []

        for (let i = 0, len = localStorage.length; i < len; i++) {
            const key = localStorage.key(i)

            if (key.startsWith(DICTIONARY_PREFIX)) {
                const dictionary = Dictionary.loadFromStorage(key)
                dictionaries.push(dictionary)
            }
        }

        return dictionaries
    }

    public static async loadStandardDictionaries(): Promise<Dictionary[]> {
        let dictionaries: Dictionary[] = []

        await import('$lib/game/contents/ege2023')
            .then(module => dictionaries.push(module.default))
        // insert imports here

        return dictionaries
    }
}


export {
    Dictionary,
    Dictionaries
}
