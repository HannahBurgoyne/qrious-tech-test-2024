import { usePokemon } from '../hooks/usePokemon'
import PokemonDetails from './PokemonDetails'

function PokemonList() {
  const { data, isError, isFetching } = usePokemon(1)

  if (isFetching) return <p>Loading...</p>

  if (isError) return <p>Oops, error!</p>

  if (data) return data.map((pokemon) => <PokemonDetails pokemon={pokemon} />)
}

export default PokemonList
