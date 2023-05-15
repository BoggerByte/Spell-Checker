<script lang="ts">
	import { field as fieldFunc, style } from 'svelte-forms'
	import makeUnique from '$lib/utils/makeUnique'

	type Field = ReturnType<typeof fieldFunc>

	export let field: Field
	export let type:
		| 'textarea'
		| 'checkbox'
		| 'file'
		| 'password'
		| 'radio'
		| 'text'
		| 'number'
		| 'select' = undefined
	export let disabled = false
	export let required = false
	export let label = ''
	export let options: { name: string; value: unknown }[] = []

	const inputId = makeUnique('input')
</script>

<div
	class="form-group {$$props.class ? $$props.class : ''}"
	class:required
	class:disabled
	use:style={{ field }}
>
	<label for={inputId} class="label">
		<slot name="label">
			<span>{label}</span>
		</slot>
	</label>

	<slot name="input" field={$field}>
		{#if type === 'textarea'}
			<textarea id={inputId} bind:value={$field.value} />
		{:else if type === 'checkbox'}
			<input id={inputId} type="checkbox" bind:checked={$field.value} />
		{:else if type === 'file'}
			<input id={inputId} type="file" bind:files={$field.value} />
		{:else if type === 'radio'}
			<input id={inputId} type="radio" bind:group={$field.value} />
		{:else if type === 'password'}
			<input id={inputId} type="password" bind:value={$field.value} />
		{:else if type === 'text'}
			<input id={inputId} type="text" bind:value={$field.value} />
		{:else if type === 'number'}
			<input id={inputId} type="number" bind:value={$field.value} />
		{:else if type === 'select'}
			<select id={inputId} bind:value={$field.value}>
				{#each options as option}
					<option value={option.value}>{option.name}</option>
				{/each}
			</select>
		{/if}
	</slot>
</div>
