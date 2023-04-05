import type { Dictionary } from "../types/dictionary";
import type { Answer } from "../types/answer";
import type { Writable } from "svelte/store";
import { writable } from "svelte/store";


type GameState = 'settings' | 'game' | 'results'

interface Game {
    state: GameState
    dictionary?: Dictionary
    maxRounds?: number
    round: number
    answers: Answer[]
}

interface GameStore extends Writable<Game> {
    reset(): void
    next(state: GameState): void
}

function initGameStore(): GameStore  {
    const initial: Game = {
        state: 'settings',
        dictionary: undefined,
        maxRounds: undefined,
        round: 1,
        answers: []
    }

    const { subscribe, set, update } = writable<Game>(structuredClone(initial))

    return {
        subscribe,
        set,
        update,
        reset: () => set(structuredClone(initial)),
        next: (state: GameState) => update(value => {
            value.state = state
            return value
        })
    }
}

export {
    type Game,
    type GameStore,
    type GameState,
    initGameStore
}
