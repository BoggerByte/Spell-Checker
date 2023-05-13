<script lang="ts">
	import GameCard from '$lib/game/card/GameCard.svelte'
	import Button from '$lib/components/Button.svelte'
	import type { Answer } from '$lib/game/types/Answer'
	import { swipe } from '../transitions'
	import type { GameStore } from '../store'
	import { getContext } from 'svelte'
	import { fade } from 'svelte/transition'
	import wait from '$lib/utils/wait'

	type WordCardRef = HTMLElement & { check(): Promise<unknown>; focus(): void }

	const game = getContext<GameStore>('game')

	let wordCardRefs = new Array<WordCardRef>($game.maxRounds)
	let answerButtonRef: HTMLButtonElement

	let overlayHidden = false

	function getCurrentCard(): WordCardRef {
		return wordCardRefs[$game.round - 1]
	}

	async function handleAnswer(event) {
		const answer = event.detail as Answer

		$game.answers.push(answer)

		if ($game.round >= $game.maxRounds) {
			await goToResults()
		} else {
			$game.round++
		}
	}

	async function checkCurrentCard() {
		const currentCard = getCurrentCard()
		answerButtonRef.blur()

		await wait(100, () => (overlayHidden = true))
		await currentCard.check()
		await wait(600, () => (overlayHidden = false))
	}

	async function goToMainMenu() {
		await wait(600, () => (overlayHidden = true)).then(() => game.reset())
	}

	async function goToResults() {
		await wait(600, () => (overlayHidden = true)).then(() => game.nextState('results'))
	}

	$: correctAnswersAmount = $game.answers.filter((ans) => ans.isCorrect).length
	$: incorrectAnswersAmount = $game.answers.filter((ans) => !ans.isCorrect).length

	// deallocate used cards
	$: wordCardRefs.forEach((_, idx) => {
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
			'. c c .'
			'. b b .'
			'. b b .';

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

<div class="flex flex-col items-center" in:fade={{ duration: 600, delay: 600 }}>
	<div class="round mb-2 sm:mb-4">
		{$game.round} из {$game.maxRounds}
	</div>

	<div
		class="relative aspect-[5/7] min-w-[300px] w-[75vw] sm:w-[400px] md:w-[450px] lg:w-[500px] z-0"
	>
		{#each $game.dictionary.entries as entry, idx (entry)}
			{#if idx + 1 === $game.round}
				<div class="absolute" out:swipe|local={{ duration: 600 }}>
					<GameCard
						word={entry.word}
						blanked={entry.blanked}
						{idx}
						bind:this={wordCardRefs[idx]}
						on:filled={() => answerButtonRef.focus()}
						on:answer={handleAnswer}
					/>
				</div>
			{/if}
		{/each}

		{#if !overlayHidden}
			<div class="overlay absolute bottom-[20px] z-20" transition:fade={{ duration: 300 }}>
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
					<Button class="w-full" intent="outlineSecondary" on:click={checkCurrentCard}>
						Я не знаю
					</Button>
				</div>
			</div>
		{/if}
	</div>

	<div class="options mt-4">
		<Button class="w-full" intent="link" on:click={goToMainMenu}>В Главное Меню</Button>
		<Button class="w-full" intent="link" on:click={goToResults}>Закончить</Button>
	</div>
</div>
