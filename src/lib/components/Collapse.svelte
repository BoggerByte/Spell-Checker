<script lang="ts">
	import { slide } from 'svelte/transition'
	import Icon from './icon/Icon.svelte'

	export let isOpen: boolean = false

	const toggle = () => (isOpen = !isOpen)
</script>

<style lang="postcss">
	.collapse {
		&-header {
			@apply py-3 pr-5
            flex items-center
            text-2xl text-gray-900;

			&:hover,
			&:focus {
				@applt text-black;
			}

			.collapse-toggler {
				@apply inline-flex items-center gap-2
                text-left;

				.toggler-icon {
					@apply flex-shrink-0;
				}
			}
		}

		&-content {
			@apply px-2 flex flex-col gap-1;
		}
	}
</style>

<div>
	<div class="collapse-header">
		<button class="collapse-toggler" on:click={toggle}>
			<Icon
				name="chevron-right"
				class="toggler-icon
                        transition-all duration-200 ease-out
                        {isOpen ? 'rotate-90' : ''}"
			/>
			<slot name="header" />
		</button>
		<div class="flex gap-2 ml-auto">
			<slot name="buttons" />
		</div>
	</div>
	{#if isOpen}
		<div class="collapse-content" transition:slide|local={{ duration: 350 }}>
			<slot />
		</div>
	{/if}
</div>
