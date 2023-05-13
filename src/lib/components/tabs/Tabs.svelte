<script lang="ts">
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'
	import type { TabsContext } from './types'

	let activeTabId = writable<string>(undefined)

	setContext<TabsContext>('tabs', {
		activeTabId,
		selectTab: (id: string) => activeTabId.set(id)
	})
</script>

<div>
	<div>
		<slot name="headers" />
	</div>
	<div class={$$props.class}>
		<slot />
	</div>
</div>
