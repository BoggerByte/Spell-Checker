<script lang="ts">
	import { getContext, onMount } from 'svelte'
	import Button from '$lib/components/Button.svelte'
	import shuffleArray from '$lib/utils/shuffleArray'
	import type { DictionaryEntry, StorableDictionary } from '$lib/game/types/Dictionary'
	import type { GameStore } from '$lib/game/store'
	import FormField from '$lib/components/form/FormField.svelte'
	import { field } from 'svelte-forms'
	import { max, min, required } from 'svelte-forms/validators'
	import { Dictionaries, Dictionary } from '$lib/game/dictionary'

	const game = getContext<GameStore>('game')

	const dictionaryName = field<string>('dictionary_name', 'ЕГЭ 2023', [required()])
	const dictionaryLength = field<number>('dictionary_length', 25, [required(), min(1), max(1000)])
	const dictionaryRandomness = field<boolean>('dictionary_randomness', true, [required()])

	// const preferencesForm = form(dictionaryName, dictionaryLength, dictionaryRandomness)

	let dictionaries: Record<string, StorableDictionary> = {}

	let dictionaryOptions: { name: string; value: string }[] = []
	let lengthOptions: { name: string; value: number }[] = [
		{
			name: '5',
			value: 5
		},
		{
			name: '15',
			value: 15
		},
		{
			name: '25',
			value: 25
		},
		{
			name: '50',
			value: 50
		},
		{
			name: '100',
			value: 100
		}
	]

	async function loadDictionaries(): Promise<void> {
		const loadedDictionaries: Dictionary[] = []

		const standardDictionaries = await Dictionaries.loadStandardDictionaries()
		loadedDictionaries.push(...standardDictionaries)
		const localDictionaries = Dictionaries.loadLocalDictionaries()
		loadedDictionaries.push(...localDictionaries)

		loadedDictionaries.forEach(dictionary => {
			dictionaries[dictionary.name] = dictionary
			dictionaryOptions.push({
				name: dictionary.name,
				value: dictionary.name
			})
		})

		dictionaries = dictionaries
		dictionaryOptions = dictionaryOptions
	}

	function prepareDictionary(
		origin: StorableDictionary,
		options: {
			length: number
			randomize: boolean
		}
	): StorableDictionary {
		let name = origin.name
		let entries: DictionaryEntry[] = structuredClone(origin).entries

		if (options.randomize) {
			name += '_shuffled'
			entries = shuffleArray(entries)
		}

		name += `_${options.length}`
		entries = entries.slice(0, options.length)

		return { name, entries }
	}

	async function start() {
		const dictionary = prepareDictionary(dictionaries[$dictionaryName.value], {
			length: +$dictionaryLength.value,
			randomize: $dictionaryRandomness.value
		})

		$game.dictionary = dictionary
		$game.maxRounds = dictionary.entries.length

		game.nextState('game')
	}

	onMount(() => loadDictionaries())
</script>

<section>
	<form on:submit|preventDefault={start}>
		<FormField
			required
			field={dictionaryName}
			type="select"
			label="Выбери словарь"
			options={dictionaryOptions}
		/>
		<FormField
			required
			field={dictionaryLength}
			type="select"
			label="Выбери количество слов"
			options={lengthOptions}
		/>
		<FormField field={dictionaryRandomness} type="checkbox" label="Перемешать словарь" />

		<Button class="w-full" intent="primary" type="submit">Начать Игру</Button>
	</form>
</section>
