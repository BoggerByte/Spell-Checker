<script lang="ts">
    import WordWithFilledBlanks from './word-with-filled-blanks.svelte'
    import Icon from '../icon/icon.svelte'
    import { type Answer } from "../../types/answer";


    export let answer: Answer
    export let idx: number
    export let highlighted: boolean = false
    export let saved: boolean = false

    function toggleSaved() {
        saved = !saved
    }
</script>

<style lang="postcss">
    .wrapper {
        @apply min-w-[300px];
    }

    .card {
        @apply w-full h-full z-0
        grid items-center
        p-2
        rounded-lg border-[1px] border-gray-300
        bg-gray-100;

        grid-template-columns: 35px 1fr 1fr 25px;
        grid-template-rows: 35px 1fr;
        grid-template-areas:
                "i w w s"
                ". c c .";

        .index {
            @apply w-9 h-9
            flex justify-center items-center
            rounded-full
            bg-gray-200;

            grid-area: i;
        }

        .word {
            @apply ml-2 text-2xl;

            grid-area: w;
        }

        .correct-word {
            @apply h-[35px] ml-2 text-2xl;

            grid-area: c;
        }

        .star {
            @apply flex justify-center items-center;

            color: theme('colors.blue.600');
            grid-area: s;
        }
    }
</style>

<div class="wrapper">
    <div class="card">
        <div class="index">{idx + 1}</div>
        <div class="word">
            <WordWithFilledBlanks
                word={answer.word}
                blanked={answer.blanked}
                value={answer.value}
                {highlighted}
            />
        </div>
        {#if !answer.isCorrect}
            <div class="correct-word">
                <WordWithFilledBlanks
                    word={answer.word}
                    blanked={answer.blanked}
                    value={answer.word}
                />
            </div>
        {/if}
        <div class="star">
            <button on:click={toggleSaved}>
                <Icon name={saved ? 'star-filled' : 'star'} />
            </button>
        </div>
    </div>
</div>
