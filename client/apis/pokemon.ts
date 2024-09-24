import request from 'superagent'
import { ApiLink, Pokemon } from '../../models/pokemon'

export async function fetchPokemonByGeneration(
  generation: number
): Promise<Pokemon[]> {
  const res = await request.get(
    `https://pokeapi.co/api/v2/generation/${generation}`
  )

  const allPokemon = res.body.pokemon_species

  const genOnePokemon = await Promise.all(
    allPokemon?.map(async (pokemon: ApiLink) => {
      const res = await request.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      )

      const {
        id,
        name,
        height,
        weight,
        sprites,
        base_experience,
        cries,
        abilities,
        moves,
        types,
      } = res.body

      return {
        id,
        name,
        height,
        weight,
        sprites,
        base_experience,
        cries,
        abilities,
        moves,
        types,
      }
    })
  )

  return genOnePokemon as Pokemon[]
}
