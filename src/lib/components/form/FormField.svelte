<script lang="ts">
    import { field as fieldFunc, style } from 'svelte-forms'


    type Field = ReturnType<typeof fieldFunc>

    export let field: Field
    export let type: 'textarea' | 'checkbox' | 'file' | 'password' | 'radio' | 'text' | 'number' | 'select' =
        undefined
    export let disabled = false
    export let required = false
    export let label = ''
    export let options: { name: string, value: unknown }[] = []

    $: value = $field.value
</script>

<div
        class="form-group {$$props.class ? $$props.class : ''}"
        class:required
        class:disabled
        use:style={{ field }}
>
    <div class="label">
        <slot name="label">
            <span>{label}</span>
        </slot>
    </div>

    <slot name="input" {value}>
        {#if type === 'textarea'}
            <textarea bind:value={$field.value}></textarea>
        {/if}
        {#if type === 'checkbox'}
            <input type="checkbox" bind:checked={$field.value}/>
        {/if}
        {#if type === 'file'}
            <input type="file" bind:files={$field.value}/>
        {/if}
        {#if type === 'radio'}
            <input type="radio" bind:group={$field.value}/>
        {/if}
        {#if type === 'password'}
            <input type="password" bind:value={$field.value}/>
        {/if}
        {#if type === 'text'}
            <input type="text" bind:value={$field.value}/>
        {/if}
        {#if type === 'number'}
            <input type="number" bind:value={$field.value}/>
        {/if}
        {#if type === 'select'}
            <select bind:value={$field.value}>
                {#each options as option}
                    <option value={option.value}>{option.name}</option>
                {/each}
            </select>
        {/if}
    </slot>
</div>
