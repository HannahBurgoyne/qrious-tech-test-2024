import { usePokemon } from '../hooks/usePokemon'
import PokemonDetails from './PokemonDetails'

function PokemonList() {
  const { data, isError, isFetching } = usePokemon(1)

  if (isFetching) return <p>Loading...</p>

  if (isError) return <p>Oops, error!</p>

  if (data)
    return (
      <section className="grid grid-cols-4 gap-4 p-6">
        {data.map((pokemon) => (
          <div>
            <h1>
              {pokemon.name} {pokemon.id}
            </h1>
            <p>
              Types:
              {pokemon.types.map((type) => (
                <p>
                  <a href={`${type.type.url}`}>{type.type.name}</a>
                </p>
              ))}
            </p>
            <img
              src={`${pokemon.sprites.front_default}`}
              alt={`sprite for ${pokemon.name}`}
            />
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <PokemonDetails pokemon={pokemon} />
          </div>
        ))}
      </section>
    )
}

export default PokemonList
