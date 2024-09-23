import request from 'superagent'
import { ApiLink, Pokemon } from '../../models/pokemon'

export async function fetchPokemonByGeneration(
  generation: number
): Promise<Pokemon[]> {
  const res = await request.get(
    `https://pokeapi.co/api/v2/generation/${generation}`
  )

  const allPokemon = res.body.pokemon_species

  const firstGenPokemon = await Promise.all(
    allPokemon?.map(async (pokemon: ApiLink) => {
      const res = await request.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      )
      return res.body
    })
  )
  return firstGenPokemon as Pokemon[]
}
