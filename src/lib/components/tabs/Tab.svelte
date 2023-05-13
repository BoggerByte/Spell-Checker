<script lang="ts">
	import { getContext } from 'svelte'
	import type { TabsContext } from './types'

	const { activeTabId } = getContext<TabsContext>('tabs')

	export let tabId: string
</script>

{#if $activeTabId === tabId}
	<div class={$$props.class}>
		<slot />
	</div>
{/if}
