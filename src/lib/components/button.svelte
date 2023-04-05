<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";
    import { cva, type VariantProps } from "class-variance-authority";

    const button = cva([
        'border-[1px]',
        'transition-all ease-in-out duration-200'
    ], {
        variants: {
            intent: {
                primary: [
                    'text-white',
                    'border-blue-600 hover:border-blue-500',
                    'bg-blue-500 hover:bg-blue-400'
                ],
                link: [
                    'text-black',
                    'border-none',
                    'shadow-none',
                    'hover:underline'
                ],
                outlineSecondary: [
                    'text-gray-700 hover:text-gray-800',
                    'bg-gray-100 hover:border-gray-400 ',
                    'border-gray-500 hover:bg-white'
                ]
            },
            disabled: {
                true: [
                    'opacity-1/2',
                    'cursor-not-allowed',
                    'focus:ring-0 focus:outline-none'
                ]
            },
            size: {
                small: [
                    'px-4 py-3',
                    'text-lg',
                    'shadow-sm',
                    'rounded-md'
                ],
                medium: [
                    'px-5 py-4',
                    'text-base',
                    'shadow-md',
                    'rounded-md'
                ],
                large: [
                    'px-6 py-5',
                    'text-sm',
                    'shadow-lg',
                    'rounded-md'
                ]
            }
        },
        defaultVariants: {
            intent: 'primary',
            size: 'medium'
        }
    })
    interface $$Props extends HTMLButtonAttributes, VariantProps<typeof button> {}

    export let intent: $$Props['intent'] = 'primary'
    export let size: $$Props['size'] = 'medium'
    export let disabled: $$Props['disabled'] = false

    let ref: HTMLButtonElement

    export const focus = () => ref.focus()

    $: buttonClass = button({ intent, size, disabled, class: $$props.class })
</script>

<button
    {...$$props}
    class={buttonClass}
    bind:this={ref}
    on:click
    on:focus
>
    <slot />
</button>
