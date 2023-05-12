<script lang="ts">
    import { type ComponentType, setContext } from "svelte";
    import { type GameStore, type GameState, initGameStore } from "./store";
    import MainMenu from './states/MainMenu'
    import Game from './states/Game.svelte'
    import Results from './states/Results.svelte'


    const game = initGameStore({
        state: 'main-menu',
        dictionary: undefined,
        maxRounds: undefined,
        round: 1,
        answers: []
    });

    setContext<GameStore>('game', game)

    const stateComponents: Record<GameState, ComponentType> = {
        'main-menu': MainMenu,
        'game': Game,
        'results': Results
    }

    $: currentComponent = stateComponents[$game.state]
</script>

<svelte:component this={currentComponent} />
