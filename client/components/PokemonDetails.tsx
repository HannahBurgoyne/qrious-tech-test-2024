import { useParams } from 'react-router-dom'
import { usePokemon } from '../hooks/usePokemon'

function PokemonDetails() {
  const { id } = useParams()
  const { data, isError, isFetching } = usePokemon(1)

  const pokemon = data?.find((poke) => poke.id.toString() === id)

  console.log(pokemon)

  if (!pokemon) return <p>Pokémon not found!</p>
  return (
    <section className="bg-background p-10">
      <div className="bg-white rounded p-5 max-w-3xl mx-auto grid grid-cols-2">
        <div>
          <h1 className="font-heading text-xl font-semibold">{pokemon.name}</h1>
          <img
            src={`${pokemon.sprites.front_default}`}
            alt={`sprite for ${pokemon.name}`}
            className="w-48"
          />
          <audio controls>
            <source src={pokemon.cries.latest} type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>
          <p>Base experience: {pokemon.base_experience}</p>
        </div>
        <div>
          <h2 className="font-heading text-lg font-semibold">Abilities:</h2>
          {pokemon.abilities.map((ability) => (
            <p>
              <a href={`${ability.ability.url}`}>{ability.ability.name}</a>
            </p>
          ))}

          <h2>Moves:</h2>
          {pokemon.moves.map((move) => (
            <p>
              <a href={`${move.move.url}`}>{move.move.name}</a>
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PokemonDetails
