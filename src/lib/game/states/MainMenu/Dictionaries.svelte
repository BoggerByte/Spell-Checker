<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import Collapse from '$lib/components/Collapse.svelte'
	import handleFileUpload from '$lib/utils/handleFileUpload'
	import { Dictionaries, Dictionary } from '$lib/game/dictionary'
	import type { StorableDictionary } from '$lib/game/types/Dictionary'
	import { onMount } from 'svelte'
	import { array, object, string, is } from 'superstruct'

	const StorableDictionaryObject = object({
		name: string(),
		entries: array(
			object({
				word: string(),
				blanked: string()
			})
		)
	})

	function isStorableDictionary(obj: unknown): obj is StorableDictionary {
		return is(obj, StorableDictionaryObject)
	}

	const handleDictionaryUpload = () =>
		handleFileUpload((file) => {
			const reader = new FileReader()
			reader.addEventListener('load', () => {
				const result = String(reader.result)

				let storableDictionary: unknown
				try {
					storableDictionary = JSON.parse(result)
				} catch (ignored) {
					alert('Допущена ошибка в JSON')
					return
				}

				if (!isStorableDictionary(storableDictionary)) {
					alert('Неверная конфигурация словаря')
					return
				}

				const dictionary = new Dictionary(storableDictionary.name, storableDictionary.entries)
				dictionary.saveToStorage()

				alert(`Словарь ${file.name} был успешно добавлен`)
			})
			reader.readAsText(file)
		})

	function viewDictionary(name: string) {
		console.log(name)
	}

	let localDictionaries: StorableDictionary[] = []
	let standardDictionaries: StorableDictionary[] = []

	onMount(async () => {
		localDictionaries = Dictionaries.loadLocalDictionaries()
		standardDictionaries = await Dictionaries.loadStandardDictionaries()
	})
</script>

<style lang="postcss">
	.dictionaries-list {
		@apply flex flex-col gap-2;

		.dictionary-item {
			@apply w-full h-full
            grid items-center
            p-2
            rounded-lg border-[1px] border-gray-300
            bg-gray-100;

			grid-template-columns: 35px repeat(5, 1fr);
			grid-template-rows: 35px;
			grid-template-areas: 'i n n n b b';

			.index {
				@apply w-9 h-9
                flex justify-center items-center
                rounded-full
                bg-gray-200;

				grid-area: i;
			}

			.name {
				@apply ml-2 text-xl
                cursor-pointer;

				grid-area: n;
			}

			.buttons {
				@apply flex gap-2 justify-end;

				grid-area: b;
			}
		}
	}
</style>

<section>
	<div class="mb-4 flex flex-col items-center">
		<Button class="w-full lg:w-[500px]" intent="primary" on:click={handleDictionaryUpload}>
			Загрузить свой словарь
		</Button>
	</div>

	<Collapse isOpen={true}>
		<h2 slot="header">Стандартные словари</h2>

		<div class="dictionaries-list">
			{#each standardDictionaries as dict, idx}
				<div class="dictionary-item">
					<div class="index">{idx + 1}</div>
					<div class="name">
						<button on:click={() => viewDictionary(dict.name)}>
							{dict.name} ({dict.entries.length})
						</button>
					</div>
					<div class="buttons">
						<button> Редактировать </button>
						<button> Удалить </button>
					</div>
				</div>
			{/each}
		</div>
	</Collapse>

	<Collapse isOpen={true}>
		<h2 slot="header">Сохранённые словари</h2>

		<div class="dictionaries-list">
			{#each localDictionaries as dict, idx}
				<div class="dictionary-item">
					<div class="index">{idx + 1}</div>
					<div class="name">
						<button on:click={() => viewDictionary(dict.name)}>
							{dict.name} ({dict.entries.length})
						</button>
					</div>
					<div class="buttons">
						<button> Редактировать </button>
						<button> Удалить </button>
					</div>
				</div>
			{/each}
		</div>
	</Collapse>
</section>
