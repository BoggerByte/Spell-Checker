<script lang="ts">
	import Play from '$lib/game/states/MainMenu/Play.svelte'
	import Dictionaries from '$lib/game/states/MainMenu/Dictionaries.svelte'
	import Settings from '$lib/game/states/MainMenu/Settings.svelte'
	import { Tabs, Tab, TabLink } from '$lib/components/tabs'
	import { fade } from 'svelte/transition'
</script>

<div transition:fade={{ duration: 600 }}>
	<Tabs class="flex flex-col items-center">
		<nav slot="headers" class="py-6 mx-auto w-full sm:w-[400px] flex gap-2">
			<TabLink class="w-full" tabId="play" header="Играть" active />
			<TabLink class="w-full" tabId="dictionaryOptions" header="Словари" />
			<TabLink class="w-full" tabId="settings" header="Настройки" />
		</nav>

		<Tab class="w-full sm:w-[400px]" tabId="play">
			<Play />
		</Tab>
		<Tab class="w-full" tabId="dictionaryOptions">
			<Dictionaries />
		</Tab>
		<Tab class="w-full sm:w-[400px]" tabId="settings">
			<Settings />
		</Tab>
	</Tabs>
</div>
