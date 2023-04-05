<script lang="ts">
    import WordWithFilledBlanks from './word-with-filled-blanks.svelte'
    import Icon from '../icon/icon.svelte'
    import type { Answer } from "../../types/answer";


    export let answer: Answer
    export let idx: number
    export let highlighted: boolean = false
    export let saved: boolean = false

    function toggleSaved() {
        saved = !saved
    }
</script>

<style lang="postcss">
    .card {
        @apply aspect-[5/7] min-w-[300px] z-0
        grid
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
</style>

<div class="card">
    <div class="index">{idx + 1}</div>
    <div class="star">
        <button on:click={toggleSaved}>
            <Icon name={saved ? 'star-filled' : 'star'} />
        </button>
    </div>
    <div class="word
                flex items-center justify-center">
        <WordWithFilledBlanks
            word={answer.word}
            blanked={answer.blanked}
            value={answer.value}
            {highlighted}
        />
    </div>
    <div class="description">

    </div>
</div>
