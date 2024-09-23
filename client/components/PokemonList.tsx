import { usePokemon } from '../hooks/usePokemon'

function PokemonList() {
  const { data, isError, isFetching } = usePokemon(1)

  if (isFetching) return <p>Loading...</p>

  if (isError) return <p>Oops, error!</p>

  if (data)
    return data.pokemon_species.map((pokemon) => (
      <p>
        <a href={`${pokemon.url}`}>{pokemon.name}</a>
      </p>
    ))
}

export default PokemonList
