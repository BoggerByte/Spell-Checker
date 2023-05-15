import { Dictionary } from '$lib/game/dictionary'
import ege2023storable from './ege2023.json'

const ege2023 = new Dictionary(ege2023storable.name, ege2023storable.entries)

export default ege2023
