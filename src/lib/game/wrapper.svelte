<script lang="ts">
    import { setContext } from "svelte";
    import Settings from './settings.svelte'
    import Cards from './cards.svelte'
    import Results from './results.svelte'
    import { type GameState, type GameStore, initGameStore } from "./game";


    const game = initGameStore();
    const states: { [name: GameState]: object } = {
        settings: Settings,
        game: Cards,
        results: Results
    }

    setContext<GameStore>('game', game)
</script>

<svelte:component this={states[$game.state]}/>
