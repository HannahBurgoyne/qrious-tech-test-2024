import { useQuery } from '@tanstack/react-query'
import { fetchPokemonByGeneration } from '../apis/pokemon'

export function usePokemon(generation: number) {
  const query = useQuery({
    queryKey: ['pokemon'],
    queryFn: () => fetchPokemonByGeneration(generation),
  })
  return {
    ...query,
  }
}
