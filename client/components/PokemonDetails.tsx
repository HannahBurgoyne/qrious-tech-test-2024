import { useParams } from 'react-router-dom'
import { usePokemon } from '../hooks/usePokemon'
import Icon from './UI/Icon'

function PokemonDetails() {
  const { id } = useParams()
  const { data, isError, isFetching } = usePokemon(1)

  const pokemon = data?.find((poke) => poke.id.toString() === id)

  if (isFetching) return <p>Loading...</p>

  if (!pokemon || isError) return <p>Pokémon not found!</p>
  return (
    <section className="bg-background p-10">
      <div className="bg-white rounded p-5 max-w-3xl mx-auto">
        <div className="flex justify-between">
          <div>
            <h1 className="font-heading text-xl font-semibold">
              {pokemon.name}
            </h1>
            <img
              src={`${pokemon.sprites.front_default}`}
              alt={`sprite for ${pokemon.name}`}
              className="w-48"
            />
            <audio controls>
              <source src={pokemon.cries.latest} type="audio/ogg" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <div>
            <div className="flex justify-start">
              {pokemon.types.map((type) => (
                <Icon backgroundColor={type.type.name}>
                  <p className="text-sm font-body">
                    <a href={`${type.type.url}`}>{type.type.name}</a>
                  </p>
                </Icon>
              ))}
            </div>
            <h2 className="font-heading text-lg font-semibold">
              Base experience:
            </h2>
            <p className="p-2">{pokemon.base_experience}</p>

            <h2 className="font-heading text-lg font-semibold">Abilities:</h2>
            {pokemon.abilities.map((ability) => (
              <p className="p-2" key={ability.ability.name}>
                <a href={`${ability.ability.url}`}>{ability.ability.name}</a>
              </p>
            ))}
          </div>
        </div>
        <h2 className="font-heading text-lg font-semibold mt-6">Moves:</h2>
        <div className="grid grid-cols-5 gap-2">
          {pokemon.moves.map((move) => (
            <p key={move.move.name}>
              <a href={`${move.move.url}`}>{move.move.name}</a>
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PokemonDetails
