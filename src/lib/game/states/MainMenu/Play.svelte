<script lang="ts">
    import { getContext } from "svelte";
    import Button from '$lib/components/Button.svelte'
    import shuffleArray from "$lib/utils/shuffleArray";
    import type { DictionaryEntry, StorableDictionary } from "$lib/game/types/Dictionary";
    import type { GameStore } from "../../store";
    import { field, form } from "svelte-forms";
    import { max, min, required } from "svelte-forms/validators";
    import FormField from "$lib/components/form/FormField.svelte";
    import ege2023 from "$lib/game/contents/ege2023";
    import mistakes from "$lib/game/contents/mistakes";


    const game = getContext<GameStore>('game')


    const dictionaryName = field<string>('dictionary_name', 'ege2023', [required()])
    const dictionaryLength = field<number>('dictionary_length', 25, [required(), min(1), max(1000)])
    const dictionaryRandomness = field<boolean>('dictionary_randomness', true, [required()])

    const preferencesForm = form(
        dictionaryName,
        dictionaryLength,
        dictionaryRandomness
    )

    const dictionaries: Record<string, StorableDictionary> = {
        'ege2023': ege2023,
        'mistakes': mistakes
    }

    let dictionaryOptions: { name: string, value: string }[] = [
        {
            name: ege2023.name,
            value: 'ege2023'
        },
        {
            name: 'Ошибки',
            value: 'mistakes'
        }
    ]

    let lengthOptions: { name: string, value: number, }[] = [
        {
            name: "5",
            value: 5
        },
        {
            name: "15",
            value: 15
        },
        {
            name: "25",
            value: 25
        },
        {
            name: "50",
            value: 50
        },
        {
            name: "100",
            value: 100
        }
    ]

    function prepareDictionary(origin: StorableDictionary, options: {
        length: number,
        randomize: boolean
    }): StorableDictionary {
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


<section>
    <form on:submit|preventDefault={start}>
        <FormField required field={dictionaryName} type="select" label="Выбери словарь" options={dictionaryOptions}/>
        <FormField required field={dictionaryLength} type="select" label="Выбери количество слов" options={lengthOptions}/>
        <FormField field={dictionaryRandomness} type="checkbox" label="Перемешать словарь"/>

        <Button class="w-full" intent="primary" type="submit">
            Начать Игру
        </Button>
    </form>
</section>
