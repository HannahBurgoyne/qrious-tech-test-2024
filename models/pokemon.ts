// Number (id column in the JSON)
// o Name
// o Type
// o Height
// o Weight

export interface PokemonGeneration {
  id: number
  main_region: ApiLink
  moves: ApiLink[]
  name: string
  names: Name[]
  pokemon_species: ApiLink[]
  types: ApiLink[]
}

export interface Name {
  language: ApiLink
  name: string
}

export interface ApiLink {
  name: string
  url: string
}

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
