<script lang="ts">
    import icons from './icons'

    export let name
    export let width = '1rem'
    export let height = '1rem'
    export let focusable = false

    let displayIcon = icons.find((e) => e.name === name)
</script>

<svg class={$$props.class} {focusable} {width} {height} viewBox="0 0 {displayIcon.box} {displayIcon.box}" fill="none">
    {@html displayIcon.svg}
</svg>
