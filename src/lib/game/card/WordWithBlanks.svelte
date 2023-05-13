<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'
	import replaceAt from '$lib/utils/replaceAt'
	import wait from '$lib/utils/wait'

	const dispatch = createEventDispatcher()

	const BLANK_LETTER = '_'

	export let word: string
	export let blanked: string
	export let value: string
	export const highlight = async () => {
		await wait(600, () => (highlighted = true))
	}
	export const focus = () => {
		if (inputRefs.length > 0) {
			inputRefs[0].focus()
		}
	}

	let highlighted = false

	let wordRef: HTMLElement
	let inputRefs: HTMLInputElement[]

	function handleLetter(event, idx: number) {
		const letter = event.target.value || BLANK_LETTER
		value = replaceAt(value, idx, letter)
	}

	function handleInput(event) {
		const input: HTMLInputElement = event.target
		const idx = inputRefs.indexOf(input)

		if (!input.value) return

		if (idx + 1 <= inputRefs.length - 1) {
			inputRefs[idx + 1].focus()
		} else {
			dispatch('filled')
		}
	}

	function handleBackspace(event) {
		if (event.key !== 'Backspace') return

		const input: HTMLInputElement = event.target
		const idx = inputRefs.indexOf(input)

		if (input.value) return

		event.preventDefault()
		if (idx - 1 >= 0) {
			inputRefs[idx - 1].focus()
		}
	}

	onMount(() => {
		value = structuredClone(blanked)

		inputRefs = [...wordRef.querySelectorAll('.blank-letter input')]
	})
</script>

<style lang="postcss">
	.word {
		@apply inline-flex flex-wrap items-baseline justify-center;

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

<div class="word" bind:this={wordRef} on:input={handleInput} on:keydown={handleBackspace}>
	{#each blanked as letter, idx}
		{#if letter === BLANK_LETTER}
			<div
				class="blank-letter"
				class:correct={highlighted && value[idx] === word[idx]}
				class:incorrect={highlighted && value[idx] !== word[idx]}
			>
				<input
					on:input={(e) => handleLetter(e, idx)}
					on:focus={(e) => e.target.select()}
					type="text"
					maxlength="1"
				/>
				<div class:underline={value[idx] === BLANK_LETTER} />
			</div>
		{:else}
			<div class="letter">
				{word[idx]}
			</div>
		{/if}
	{/each}
</div>
