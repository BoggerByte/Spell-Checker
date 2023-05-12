<script lang="ts">
    import { getContext, onMount } from "svelte";
    import { flip } from "svelte/animate";
    import { crossfade } from "svelte/transition";
    import { slide, fade } from "svelte/transition";
    import type { Answer } from "$lib/game/types/Answer";
    import type { DictionaryEntry } from "$lib/game/types/Dictionary";
    import ResultCard from '$lib/game/card/ResultCard.svelte'
    import ResultRow from '$lib/game/card/ResultRow.svelte'
    import Collapse from '$lib/components/Collapse.svelte'
    import Button from '$lib/components/Button.svelte'
    import type { GameStore } from "../store";
    import { Dictionary } from "../dictionary";

    const game = getContext<GameStore>('game')

    const [sendCorrect, receiveCorrect] = crossfade({})
    const [sendIncorrect, receiveIncorrect] = crossfade({})

    let answers = structuredClone($game.answers)
    let correctAnswersCollapse: Answer[] = []
    let incorrectAnswersCollapse: Answer[] = []

    let showAnswersStack: boolean = true
    let showSaveMistakesButton: boolean = true

    function saveMistakes() {
        const MISTAKES_DICTIONARY_NAME = 'mistakes'
        const mistakesDictionaryKey = Dictionary.getStorageKey(MISTAKES_DICTIONARY_NAME)

        const mistakes: DictionaryEntry[] = answers
            .filter(ans => !ans.isCorrect)
            .map(ans => ({ word: ans.word, blanked: ans.blanked }))
        const newMistakes = mistakes.filter(newEntry => !(newEntry in mistakes))

        let mistakesDictionary: Dictionary
        try {
            mistakesDictionary = Dictionary.loadFromStorage(mistakesDictionaryKey)
            mistakesDictionary.entries.push(...newMistakes)
        } catch (ignored) {
            mistakesDictionary = new Dictionary(MISTAKES_DICTIONARY_NAME, newMistakes)
        }

        mistakesDictionary.saveToStorage()
    }

    function restart() {
        game.reset()
        game.nextState('main-menu')
    }

    function sortCardsStack() {
        for (let i = 0; i < answers.length; i++) {
            const answer = answers[i]

            if (answer.isCorrect) {
                correctAnswersCollapse.push(answer)
                correctAnswersCollapse = correctAnswersCollapse
            } else {
                incorrectAnswersCollapse.push(answer)
                incorrectAnswersCollapse = incorrectAnswersCollapse
            }

            answers.slice(i, 1)
            answers = answers
        }

        showAnswersStack = false
    }

    onMount(() => setTimeout(sortCardsStack, 1000))
</script>

<style lang="postcss">
    .round {
        @apply text-center text-2xl md:text-3xl;
    }
</style>

{#if showAnswersStack}
    <section class="flex flex-col items-center" out:slide|local={{ duration: 600 }}>
        <div class="round mb-2 sm:mb-4">
            {$game.round} из {$game.maxRounds}
        </div>

        <div class="relative aspect-[5/7] min-w-[300px] w-[75vw] sm:w-[400px] md:w-[450px] lg:w-[500px]">
            {#each answers as answer, idx (answer)}
                <div class="absolute w-full h-full">
                    {#if answer.isCorrect}
                        <div out:sendCorrect={{ key: answer }}>
                            <ResultCard {answer} {idx} highlighted />
                        </div>
                    {:else}
                        <div out:sendIncorrect={{ key: answer }}>
                            <ResultCard {answer} {idx} highlighted saved />
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </section>
{:else}
    <div class="text-5xl text-center my-4">
        Тест Завершён
    </div>

    <section in:fade>
        <Collapse isOpen={true}>
            <h1 slot="header">Правильные Ответы</h1>

            <div class="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {#each correctAnswersCollapse as answer, idx (answer)}
                    <div class="w-full" animate:flip in:receiveCorrect={{ key: answer }}>
                        <ResultRow {answer} {idx} highlighted />
                    </div>
                {:else}
                    <div class="text-gray-600">
                        Нет правильных ответов
                    </div>
                {/each}
            </div>
        </Collapse>

        <Collapse isOpen={true}>
            <h1 slot="header">Неправильные Ответы</h1>

            <div class="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {#each incorrectAnswersCollapse as answer, idx (answer)}
                    <div class="w-full" animate:flip in:receiveIncorrect={{ key: answer }}>
                        <ResultRow {answer} {idx} highlighted saved />
                    </div>
                {:else}
                    <div class="text-gray-600">
                        Нет неправильных ответов
                    </div>
                {/each}
            </div>
        </Collapse>

        {#if showSaveMistakesButton}
            <div class="mt-6 flex flex-col items-center" transition:slide|local>
                <Button
                    class="w-full lg:w-[500px]"
                    intent="outlineSecondary"
                    on:click={() => { saveMistakes(); showSaveMistakesButton = false }}
                >
                    Сохранить новые ошибочные ответы в словарь
                </Button>
            </div>
        {/if}

        <div class="mt-1 flex flex-col items-center">
            <Button class="my-3 w-full lg:w-[500px]" intent="primary" on:click={restart}>
                Играть Снова
            </Button>
        </div>
    </section>
{/if}
