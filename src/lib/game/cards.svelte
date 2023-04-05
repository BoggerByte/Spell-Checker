<script lang="ts">
    import GameCard from '../components/card/game-card.svelte'
    import Button from '../components/button.svelte'
    import type { Answer } from "../types/answer";
    import { getContext } from "svelte";
    import { swipe } from "./transitions";
    import { fade } from "svelte/transition";
    import type { GameStore } from "./game";


    type WordCardRef = HTMLElement & { check(): void }

    const game = getContext<GameStore>('game')

    let wordCardRefs = new Array<WordCardRef>($game.maxRounds)
    let answerButtonRef: HTMLButtonElement

    let hideLayout: boolean = false

    function handleAnswer(event) {
        const answer = event.detail satisfies Answer

        if (answer.isCorrect) {
            console.debug('Correct!')
        } else {
            console.debug('Incorrect!')
        }

        $game.answers.push(answer)

        if ($game.round >= $game.maxRounds) {
            goToResults()
            return
        }

        $game.round++
    }

    function focusOnAnswerButton() {
        answerButtonRef.focus()
    }

    function checkCurrentCard() {
        const currentCard = wordCardRefs[$game.round - 1]
        currentCard.check()
    }

    function goToSettings() {
        game.reset()
        game.next('settings')
    }

    function goToResults() {
        hideLayout = true
        setTimeout(() => game.next('results'), 600)
    }

    $: correctAnswersAmount = $game.answers.filter(ans => ans.isCorrect).length
    $: incorrectAnswersAmount = $game.answers.filter(ans => !ans.isCorrect).length

    $: wordCardRefs, wordCardRefs.forEach((_, idx) => {
        if (idx === $game.round - 1) return
        wordCardRefs[idx] = null
    })
</script>

<style lang="postcss">
    .round {
        @apply text-center text-2xl md:text-3xl;
    }

    .options {
        @apply flex flex-row gap-2;
    }

    .overlay {
        @apply aspect-[5/3] min-w-[300px] w-[75vw] sm:w-[400px] md:w-[450px] lg:w-[500px]
        grid
        p-2 sm:p-4;

        grid-template-columns: 35px 1fr 1fr 35px;
        grid-template-rows: 1fr 1fr 50px;
        grid-template-areas:
                ". c c ."
                ". b b ."
                ". b b .";

        .counter {
            @apply flex gap-1 items-center justify-center
            text-xl;

            grid-area: c;
        }

        .buttons {
            @apply flex flex-col gap-2;

            grid-area: b;
        }
    }
</style>


<div class="flex flex-col items-center">
    <div class="round mb-2 sm:mb-4">
        {$game.round} из {$game.maxRounds}
    </div>

    <div class="relative aspect-[5/7] min-w-[300px] w-[75vw] sm:w-[400px] md:w-[450px] lg:w-[500px] z-0">
        {#each $game.dictionary as entry, idx (entry)}
            {#if idx + 1 === $game.round}
                <div class="absolute" out:swipe|local>
                    <GameCard
                        word={entry.word}
                        blanked={entry.blanked}
                        idx={idx}
                        bind:this={wordCardRefs[idx]}
                        on:filled={focusOnAnswerButton}
                        on:answer={handleAnswer}
                    />
                </div>
            {/if}
        {/each}

        {#if !hideLayout}
            <div class="overlay absolute bottom-[20px] z-20" out:fade|local={{ duration: 400 }}>
                <div class="counter">
                    <span class="text-green-600">{correctAnswersAmount}</span>
                    <span>:</span>
                    <span class="text-red-600">{incorrectAnswersAmount}</span>
                </div>
                <div class="buttons">
                    <Button
                        class="w-full"
                        intent="primary"
                        bind:this={answerButtonRef}
                        on:click={checkCurrentCard}
                    >
                        Ответить
                    </Button>
                    <Button
                        class="w-full"
                        intent="outlineSecondary"
                        on:click={checkCurrentCard}
                    >
                        Я не знаю
                    </Button>
                </div>
            </div>
        {/if}
    </div>

    {#if !hideLayout}
        <div class="options mt-4" out:fade={{ duration: 600 }}>
            <Button class="w-full" intent="link" on:click={goToSettings}>
                Назад
            </Button>
            <Button class="w-full" intent="link" on:click={goToResults}>
                Закончить
            </Button>
        </div>
    {/if}
</div>
