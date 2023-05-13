<script lang="ts">
	import { getContext, onMount } from 'svelte'
	import type { TabsContext } from './types'

	const { activeTabId, selectTab } = getContext<TabsContext>('tabs')

	export let tabId: string
	export let header: string
	export let active = false

	onMount(() => {
		if (active) selectTab(tabId)
	})
</script>

{#if header}
	<button
		class={$$props.class}
		class:selected={$activeTabId === tabId}
		on:click={() => selectTab(tabId)}
	>
		{header}
	</button>
{:else}
	<slot active={$activeTabId} select={() => selectTab(tabId)} />
{/if}
