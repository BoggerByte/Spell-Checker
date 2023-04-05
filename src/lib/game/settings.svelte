<script lang="ts">
    import Button from '../components/button.svelte'
    import type { Dictionary } from "../types/dictionary";
    import shuffleArray from "../utils/shuffleArray";
    import { getContext } from "svelte";
    import { type GameStore } from "./game";
    import { getMistakesDictionary } from "./dictionaries";
    import ege2023 from "../contents/ege2023";
    import handleFileUpload from "../utils/handleFileUpload";

    const game = getContext<GameStore>('game')

    let dictionaryOptions: Record<string, { name: string, dictionary: Dictionary }> = {
        'ege2023': {
            name: 'Словарные слова ЕГЭ 2023',
            dictionary: ege2023
        },
        'mistakes': {
            name: 'Словарь из допущеных ошибок',
            dictionary: getMistakesDictionary()
        }
    }

    let selectedDictionaryName = 'ege2023'
    let selectedDictionaryLength = '25'
    let selectedRandomize = true

    const handleDictionaryUpload = () => handleFileUpload((file) => {
        if (file.type != 'application/json') return

        const reader = new FileReader()
        reader.addEventListener('load', (_) => {
            const dictionary = JSON.parse(reader.result)

            if (dictionary == undefined) return

            dictionaryOptions[file.name] = {
                name: file.name,
                dictionary
            }
            dictionaryOptions = dictionaryOptions

            alert(`Словарь ${file.name} был успешно добавлен`)
        })
        reader.readAsText(file)
    })

    function createDictionary(origin: Dictionary, options: { length: number, randomize: boolean }): Dictionary {
        const copy = structuredClone(origin)
        const stripped = copy.slice(0, options.length)

        if (options.randomize) shuffleArray(stripped)

        return stripped
    }

    async function start() {
        const dictionary = createDictionary(dictionaryOptions[selectedDictionaryName].dictionary, {
            length: +selectedDictionaryLength,
            randomize: selectedRandomize
        })

        $game.dictionary = dictionary
        $game.maxRounds = dictionary.length

        game.next('game')
    }
</script>

<style lang="postcss">
    .header {
        @apply text-center text-3xl mb-3;
    }

    .form {
        @apply flex flex-col mb-3;

        label {
            @apply ml-3 text-lg;
        }

        select {
            @apply h-[50px]
            px-4 py-2
            rounded-lg border-[1px] border-gray-300
            bg-gray-100;
        }
    }
</style>


<div class="w-full h-full flex justify-center">
    <section class="w-full md:w-[500px] mt-6">
        <div class="header">Настройки</div>

        <div class="form">
            <label for="select-dictionary">Выбери словарь</label>
            <select name="select-dictionary" id="select-dictionary" bind:value={selectedDictionaryName}>
                {#each Object.entries(dictionaryOptions) as [key, { name, dictionary }]}
                    <option value={key} disabled={dictionary.length === 0}>
                        {name} ({dictionary.length})
                    </option>
                {/each}
            </select>
        </div>

        <div class="form">
            <label for="select-words-amount">Выбери количество слов</label>
            <select name="select-words-amount" id="select-words-amount" bind:value={selectedDictionaryLength}>
                <option value="5">5</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="150">150</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
            </select>
        </div>

        <div class="mt-6 flex flex-col items-center gap-3">
            <Button class="w-full" intent="primary" on:click={handleDictionaryUpload}>
                Загрузить свой словарь
            </Button>
            <Button class="w-full" intent="primary" on:click={start}>
                Начать Игру
            </Button>
        </div>
    </section>
</div>
