import { useParams } from 'react-router-dom'
import { usePokemon } from '../hooks/usePokemon'

function PokemonDetails() {
  const { id } = useParams()
  const { data, isError, isFetching } = usePokemon(1)

  const pokemon = data?.find((poke) => poke.id.toString() === id)

  console.log(pokemon)

  if (!pokemon) return <p>Pokémon not found!</p>
  return (
    <section>
      <div>
        Abilities:
        {pokemon.abilities.map((ability) => (
          <p>
            <a href={`${ability.ability.url}`}>{ability.ability.name}</a>
          </p>
        ))}
      </div>
      <div>
        Moves:
        {pokemon.moves.map((move) => (
          <p>
            <a href={`${move.move.url}`}>{move.move.name}</a>
          </p>
        ))}
      </div>
    </section>
  )
}

export default PokemonDetails
