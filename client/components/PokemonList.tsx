import { usePokemon } from '../hooks/usePokemon'
import PokemonCard from './PokemonCard'

function PokemonList() {
  const { data, isError, isFetching } = usePokemon(1)

  if (isFetching) return <p>Loading...</p>

  if (isError) return <p>Oops, error!</p>

  if (data)
    return (
      <section className="grid grid-cols-4 gap-4 p-6 bg-background">
        {data.map((pokemon) => (
          <PokemonCard pokemon={pokemon} />
        ))}
      </section>
    )
}

export default PokemonList
