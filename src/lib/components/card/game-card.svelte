<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import WordWithBlanks from './word-with-blanks.svelte'
    import WordWithFilledBlanks from './word-with-filled-blanks.svelte'
    import Icon from '../icon/icon.svelte'


    type CardState = undefined | 'CORRECT' | 'INCORRECT'
    type WordWithBlanksRef = HTMLElement & { focus(): void, highlight(): void }

    const dispatch = createEventDispatcher()

    export let word: string
    export let blanked: string
    export let idx: number
    export const check = () => {
        const answer = {
            word, blanked, value,
            isCorrect: word.toLowerCase() === value.toLowerCase()
        }

        wordWithBlanksRef.highlight()

        if (answer.isCorrect) {
            state = 'CORRECT'
            setTimeout(() => dispatch('answer', answer), 300)
        } else {
            state = 'INCORRECT'
            setTimeout(() => flipped = true, 300)
            setTimeout(() => flipped = false, 1500)
            setTimeout(() => dispatch('answer', answer), 2000)
        }
    }

    let state: CardState = undefined
    let value: string = ""
    let flipped: boolean = false
    let saved: boolean = false

    let wordWithBlanksRef: WordWithBlanksRef

    function toggleSaved() {
        saved = !saved
    }

    onMount(() => wordWithBlanksRef.focus())

    //animation: flip 750ms ease-in-out;
    //animation-fill-mode: forwards;
    //
    //@keyframes flip {
    //    0% {
    //        transform: scale(1);
    //    }
    //    50% {
    //        transform: scale(1.05) rotateY(180deg);
    //    }
    //    100% {
    //        transform: scale(1) rotateY(180deg);
    //    }
    //}
</script>

<style lang="postcss">
    .scene {
        @apply aspect-[5/7] min-w-[300px] w-[75vw] sm:w-[400px] md:w-[450px] lg:w-[500px];
        perspective: 1000px;
    }

    .card {
        @apply relative w-full h-full z-0;

        transition: transform 400ms ease-out;
        transform-style: preserve-3d;

        .card__face {
            @apply absolute w-full h-full;

            backface-visibility: hidden;
        }

        .card__face--front, .card__face--back {
            @apply grid
            p-3 sm:p-5
            rounded-lg border-[1px] border-gray-300
            bg-gray-100;

            grid-template-columns: 35px 1fr 1fr 35px;
            grid-template-rows: 35px repeat(5, 1fr) 35px;
            grid-template-areas:
                "i . . s"
                "w w w w"
                "w w w w"
                ". d d ."
                ". . . ."
                ". . . ."
                ". . . .";

            .index {
                @apply w-9 h-9
                flex justify-center items-center
                rounded-full
                bg-gray-200;

                grid-area: i;
            }

            .star {
                @apply flex justify-center items-center;

                color: theme('colors.blue.600');
                grid-area: s;
            }

            .word {
                @apply mt-1
                text-[calc(40px+1.5vw)] sm:text-5xl md:text-6xl;

                grid-area: w;
            }

            .description {
                grid-area: d;
            }
        }

        .card__face--back {
            transform: rotateY(180deg);
        }

        &.flipped {
            transform: rotateY(180deg);
        }
    }

    .pulse-correct {
        animation: pulse-green 250ms ease-out;

        @keyframes pulse-green {
            0%, 100% {
                @apply bg-slate-100;
            }
            50% {
                @apply bg-green-200
            }
        }
    }

    .pulse-incorrect {
        animation: pulse-red 250ms ease-out;

        @keyframes pulse-red {
            0%, 100% {
                @apply bg-slate-100;
            }
            50% {
                @apply bg-red-200
            }
        }
    }
</style>


<div class="scene">
    <div class="card" class:flipped={flipped}>
        <div class="card__face card__face--front
                    {{'CORRECT': 'pulse-correct', 'INCORRECT': 'pulse-incorrect'}[state]}">
            <div class="index">{idx + 1}</div>
            <div class="star">
                <button on:click={toggleSaved}>
                    <Icon name={saved ? 'star-filled' : 'star'} />
                </button>
            </div>
            <div class="word
                        flex items-center justify-center">
                <WordWithBlanks
                    {word}
                    {blanked}
                    bind:value={value}
                    bind:this={wordWithBlanksRef}
                    on:filled
                />
            </div>
            <div class="description">

            </div>
        </div>

        <div class="card__face card__face--back
                    {{'CORRECT': 'pulse-correct', 'INCORRECT': 'pulse-incorrect'}[state]}">
            <div class="index">{idx + 1}</div>
            <div class="star">
                <button on:click={toggleSaved}>
                    <Icon name={saved ? 'star-filled' : 'star'} />
                </button>
            </div>
            <div class="word
                        flex items-center justify-center">
                <WordWithFilledBlanks
                    {word}
                    {blanked}
                    value={word}
                />
            </div>
        </div>
    </div>
</div>
