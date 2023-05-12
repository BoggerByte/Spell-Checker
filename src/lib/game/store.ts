import type { StorableDictionary } from "$lib/game/types/Dictionary";
import type { Answer } from "$lib/game/types/Answer";
import type { Writable } from "svelte/store";
import { writable } from "svelte/store";


type GameState = 'main-menu' | 'game' | 'results'


interface Game {
    state: GameState
    dictionary?: StorableDictionary
    maxRounds?: number
    round: number
    answers: Answer[]
}

interface GameStore extends Writable<Game> {
    reset(): void
    nextState(state: GameState): void
}

function initGameStore(initial: Game): GameStore  {
    const store = writable<Game>(structuredClone(initial))

    return {
        ...store,
        reset: () => store.set(structuredClone(initial)),
        nextState: (state: GameState) => {
            store.update(value => {
                value.state = state
                return value
            })
        }
    }
}

export {
    type Game,
    type GameStore,
    type GameState,
    initGameStore
}
