<script lang="ts">
	import { getContext, onMount } from 'svelte'
	import type { TabsContext } from './types'
	import Button from '$lib/components/Button.svelte'

	const { activeTabId, selectTab } = getContext<TabsContext>('tabs')

	export let tabId: string
	export let header: string
	export let active = false

	$: selected = $activeTabId === tabId

	onMount(() => {
		if (active) {
			selectTab(tabId)
		}
	})
</script>

{#if header}
	<Button
		class={$$props.class}
		intent="link"
		active={selected}
		on:click={() => selectTab(tabId)}
	>
		{header}
	</Button>
{:else}
	<slot {selected} select={() => selectTab(tabId)} />
{/if}
