<script lang="ts">
    import zip from "../../utils/zip";


    export let word: string
    export let blanked: string
    export let value: string
    export let highlighted: boolean = false
</script>

<style lang="postcss">
    .word {
        @apply inline-flex flex-wrap items-baseline justify-center;

        .letter {

        }

        .blank-letter {
            @apply relative
            w-[1.4ch] h-[2ex]
            mx-[2px];

            &.correct {
                div {
                    @apply text-green-600;
                }
            }

            &.incorrect {
                div {
                    @apply text-red-600;
                }
            }

            div {
                @apply w-[1.4ch] h-[2ex]
                text-center text-blue-500
                rounded-md border-transparent
                bg-transparent;
            }
        }
    }
</style>

<div class="word">
    {#each zip(word, blanked) as [correctLetter, letter], idx}
        {#if letter !== correctLetter}
            <div
                class="blank-letter"
                class:correct={highlighted && value[idx] === correctLetter}
                class:incorrect={highlighted && value[idx] !== correctLetter}
            >
                <div>{value[idx]}</div>
            </div>
        {:else}
            <div class="letter">
                {correctLetter}
            </div>
        {/if}
    {/each}
</div>
