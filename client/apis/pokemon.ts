import request from 'superagent'
import { PokemonGeneration } from '../../models/pokemon'

export async function fetchPokemonByGeneration(
  generation: number,
): Promise<PokemonGeneration> {
  const res = await request.get(
    `https://pokeapi.co/api/v2/generation/${generation}`,
  )

  return res.body as PokemonGeneration
}
