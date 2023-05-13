<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import Collapse from '$lib/components/Collapse.svelte'
	import handleFileUpload from '$lib/utils/handleFileUpload'
	import { Dictionaries } from '$lib/game/dictionary'
	import type { StorableDictionary } from '$lib/game/types/Dictionary'
	import { onMount } from 'svelte'

	const handleDictionaryUpload = () =>
		handleFileUpload((file) => {
			if (file.type != 'application/json') return

			const reader = new FileReader()
			reader.addEventListener('load', () => {
				const dictionary = JSON.parse(reader.result)

				if (dictionary == undefined) return

				// TODO: save dict

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
	<Collapse isOpen={true}>
		<h2 slot="header">Стандартные словари</h2>

		<div class="dictionaries-list">
			{#each standardDictionaries as dict, idx}
				<div class="dictionary-item">
					<div class="index">{idx + 1}</div>
					<div class="name" on:click={() => viewDictionary(dict.name)}>
						{dict.name} ({dict.entries.length})
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
		<h2 slot="header">Другие словари</h2>

		<div class="dictionaries-list">
			{#each localDictionaries as dict, idx}
				<div class="dictionary-item">
					<div class="index">{idx + 1}</div>
					<div class="name" on:click={() => viewDictionary(dict.name)}>
						{dict.name} ({dict.entries.length})
					</div>
					<div class="buttons">
						<button> Редактировать </button>
						<button> Удалить </button>
					</div>
				</div>
			{/each}
		</div>
	</Collapse>

	<div class="flex flex-col items-center">
		<Button class="w-full lg:w-[500px]" intent="primary" on:click={handleDictionaryUpload}>
			Загрузить свой словарь
		</Button>
	</div>
</section>
