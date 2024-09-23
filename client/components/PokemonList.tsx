import { usePokemon } from '../hooks/usePokemon'

function PokemonList() {
  const { data, isError, isFetching } = usePokemon(1)

  if (isFetching) return <p>Loading...</p>

  if (isError) return <p>Oops, error!</p>

  if (data)
    return data.map((pokemon) => (
      <section>
        <h1>{pokemon.name}</h1>
        <p>
          {' '}
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
        <p>
          {' '}
          Abilities:
          {pokemon.abilities.map((ability) => (
            <p>
              <a href={`${ability.ability.url}`}>{ability.ability.name}</a>
            </p>
          ))}
        </p>
        <p>
          Moves:
          {pokemon.moves.map((move) => (
            <p>
              <a href={`${move.move.url}`}>{move.move.name}</a>
            </p>
          ))}
        </p>
      </section>
    ))
}

export default PokemonList
