<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'
	import WordWithBlanks from './WordWithBlanks.svelte'
	import WordWithFilledBlanks from './WordWithFilledBlanks.svelte'
	import Icon from '$lib/components/icon'
	import { wait, waitFor } from '$lib/utils/timings'

	type WordWithBlanksRef = HTMLElement & { focus(): void; highlight(): Promise<void> }

	const dispatch = createEventDispatcher()

	export let word: string
	export let blanked: string
	export let idx: number
	export const check = async () => {
		const answer = {
			word,
			blanked,
			value,
			isCorrect: word.toLowerCase() === value.toLowerCase()
		}

		await wordWithBlanksRef.highlight()

		if (answer.isCorrect) {
			await wait(300)
			dispatch('answer', answer)
		} else {
			await waitFor(flip, 300)
			await wait(1000)
			await waitFor(flip, 300)
			dispatch('answer', answer)
		}
	}

	let value = ''
	let flipped = false
	let saved = false

	let wordWithBlanksRef: WordWithBlanksRef

	function save() {
		saved = !saved
	}

	function flip() {
		flipped = !flipped
	}

	onMount(() => wordWithBlanksRef.focus())
</script>

<style lang="postcss">
	.scene {
		@apply aspect-[5/7] min-w-[300px] w-[75vw] sm:w-[400px] md:w-[450px];
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

		.card__face--front,
		.card__face--back {
			@apply grid
            p-3 sm:p-5
            rounded-lg border-[1px] border-gray-300
            bg-gray-100;

			grid-template-columns: 35px 1fr 1fr 35px;
			grid-template-rows: 35px repeat(5, 1fr) 35px;
			grid-template-areas:
				'i . . s'
				'w w w w'
				'w w w w'
				'. d d .'
				'. . . .'
				'. . . .'
				'. . . .';

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
				@apply mt-1 text-[calc(40px+1.5vw)] sm:text-5xl md:text-6xl;

				grid-area: w;
			}

			.description {
				@apply text-gray-700;

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
</style>

<div class="scene">
	<div class="card" class:flipped>
		<div class="card__face card__face--front">
			<div class="index">{idx + 1}</div>
			<div class="star">
				<button on:click={save}>
					<Icon name={saved ? 'star-filled' : 'star'} />
				</button>
			</div>
			<div class="word flex items-center justify-center">
				<WordWithBlanks {word} {blanked} bind:value bind:this={wordWithBlanksRef} on:filled />
			</div>
			<!--			<div class="description">Описание карточки в разработке...</div>-->
		</div>

		<div class="card__face card__face--back">
			<div class="index">{idx + 1}</div>
			<div class="star">
				<button on:click={save}>
					<Icon name={saved ? 'star-filled' : 'star'} />
				</button>
			</div>
			<div
				class="word
               flex items-center justify-center"
			>
				<WordWithFilledBlanks {word} {blanked} value={word} />
			</div>
		</div>
	</div>
</div>
