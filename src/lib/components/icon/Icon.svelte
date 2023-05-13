<script lang="ts">
	import icons from './icons'

	export let name
	export let width = '1rem'
	export let height = '1rem'
	export let focusable = false

	$: icon = icons.find((e) => e.name === name)
</script>

<svg
	class={$$props.class}
	{focusable}
	{width}
	{height}
	viewBox="0 0 {icon.box} {icon.box}"
	fill="none"
>
	{@html icon.svg}
</svg>
