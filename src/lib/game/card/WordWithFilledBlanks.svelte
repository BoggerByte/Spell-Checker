<script lang="ts">
	const BLANK_LETTER = '_'

	export let word: string
	export let blanked: string
	export let value: string
	export let highlighted = false
</script>

<style lang="postcss">
	.word {
		@apply inline-flex flex-wrap items-baseline justify-center;

		.blank-letter {
			@apply relative
            w-[1.4ch] h-[2ex]
            mx-[2px];

			&.correct div {
				@apply text-green-600;
			}

			&.incorrect div {
				@apply text-red-600;
			}

			div {
				@apply w-[1.4ch] h-[2ex]
                text-center text-blue-500 lowercase
                rounded-md border-transparent
                bg-transparent;
			}
		}
	}
</style>

<div class="word">
	{#each blanked as letter, idx}
		{#if letter === BLANK_LETTER}
			<div
				class="blank-letter"
				class:correct={highlighted && value[idx] === word[idx]}
				class:incorrect={highlighted && value[idx] !== word[idx]}
			>
				<div>{value[idx]}</div>
			</div>
		{:else}
			<div class="letter">
				{word[idx]}
			</div>
		{/if}
	{/each}
</div>
