<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import replaceAt from "../../utils/replaceAt";
    import zip from "../../utils/zip";

    const dispatch = createEventDispatcher()

    const blank = '_'
    const specialKeys = new RegExp(/(Alt|Ctrl|Shift|GroupNext)/)
    const enterKey = new RegExp(/(Enter)/)
    const cyrillicOrBackspaceKeys = new RegExp(/(^\p{Script=Cyrillic}+$)|(Backspace)/u)


    export let word: string
    export let blanked: string
    export let value: string
    export const highlight = () => {
        highlighted = true
    }
    export const focus = () => {
        if (inputRefs.length > 0) inputRefs[0].focus()
    }

    let highlighted: boolean = false

    let wordRef: HTMLElement
    let inputRefs: HTMLInputElement[]

    function handleInput(event, idx: number) {
        const letter = event.target.value || blank
        value = replaceAt(value, idx, letter)
    }

    function selectContents(event) {
        event.target.select()
    }

    function shakeInvalidInput(input: HTMLInputElement) {
        input.classList.add('shake-invalid')
        setTimeout(() => input.classList.remove('shake-invalid'), 400)
    }

    function handleKeyup(event) {
        if (event.key.match(specialKeys)) {
            return true
        }
        if (event.key.match(enterKey)) {
            dispatch('filled')
            return true
        }

        const input = event.target
        const value = event.target.value
        const idx = inputRefs.indexOf(input)

        if (!event.key.match(cyrillicOrBackspaceKeys)) {
            shakeInvalidInput(inputRefs[idx])
            return true
        }



        // user put letter
        if (value.length >= 1 && idx + 1 <= inputRefs.length - 1) {
            inputRefs[idx + 1].focus()
        }
        // user removed letter
        else if (value.length == 0 && idx - 1 >= 0) {
            inputRefs[idx - 1].focus()
        }
    }

    onMount(() => {
        value = structuredClone(blanked)

        inputRefs = [...wordRef.getElementsByClassName("blank-letter")]
            .map(el => el.children[0] as HTMLInputElement)
    })
</script>

<style lang="postcss">
    .word {
        @apply inline-flex flex-wrap items-baseline justify-center;

        .letter {

        }

        .blank-letter {
            @apply relative w-[1.4ch]
            mx-[2px];

            &.correct {
                input {
                    @apply text-green-600;
                }

                .underline {
                    @apply bg-green-500;
                }
            }

            &.incorrect {
                input {
                    @apply text-red-600;
                }

                .underline {
                    @apply bg-red-600;
                }
            }

            input {
                @apply w-[1.4ch] h-[2ex]
                text-center text-blue-500
                rounded-md border-transparent
                bg-transparent
                outline-none caret-transparent z-0
                transition-all ease-in-out duration-200
                focus:border-transparent focus:ring-0 focus:bg-blue-200
                hover:bg-blue-100;

                &.shake-invalid {
                    animation: shake 0.2s ease-in-out;

                    @keyframes shake {
                        0%, 100% {
                            @apply ml-0 bg-transparent;
                        }
                        25% {
                            @apply ml-[0.5rem] bg-red-100;
                        }
                        75% {
                            @apply ml-[-0.5rem] bg-red-100;
                        }
                    }
                }
            }

            .underline {
                @apply absolute left-0 right-0 w-[1.1ch] h-[4px]
                mx-auto mt-[4px]
                rounded-sm
                bg-blue-500
                z-20;
            }
        }
    }
</style>

<div bind:this={wordRef} class="word" on:keyup={handleKeyup}>
    {#each zip(word, blanked) as [correctLetter, letter], idx}
        {#if letter === blank}
            <div
                class="blank-letter"
                class:correct={highlighted && value[idx] === correctLetter}
                class:incorrect={highlighted && value[idx] !== correctLetter}
            >
                <input
                    on:focus={selectContents}
                    on:input={e => handleInput(e, idx)}
                    type="text"
                    maxlength="1"
                >
                <div class:underline={value[idx] === blank}></div>
            </div>
        {:else}
            <div class="letter">
                {correctLetter}
            </div>
        {/if}
    {/each}
</div>
