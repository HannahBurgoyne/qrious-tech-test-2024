export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string
    back_default: string
  }
  base_experience: number
  cries: PokemonCries
  abilities: Ability[]
  moves: Move[]
  types: TypeInfo[]
}

interface PokemonCries {
  latest: string
  legacy: string
}
interface Ability {
  ability: { name: string; url: string }
  is_hidden: boolean
  slot: number
}

interface Move {
  move: { name: string; url: string }
}

interface TypeInfo {
  slot: number
  type: { name: string; url: string }
}
