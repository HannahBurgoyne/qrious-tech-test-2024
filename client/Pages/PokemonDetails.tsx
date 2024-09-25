import { useParams } from 'react-router-dom'
import { usePokemon } from '../hooks/usePokemon'
import Icon from '../components/UI/Icon'

function PokemonDetails() {
  const generationNumber = 1
  const { id } = useParams()
  const { data, isError, isFetching } = usePokemon(generationNumber)

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
            <audio controls aria-label={`sound of a ${pokemon.name}`}>
              <source src={pokemon.cries.latest} type="audio/ogg" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <div>
            <div className="flex justify-start">
              {pokemon.types.map((type, i) => (
                <Icon
                  key={`key ${i} for ${type.type.name}`}
                  backgroundColor={type.type.name}
                >
                  {type.type.name}
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
                {ability.ability.name}
              </p>
            ))}
          </div>
        </div>
        <h2 className="font-heading text-lg font-semibold mt-6">Moves:</h2>
        <div className="grid grid-cols-5 gap-2 p-6">
          {pokemon.moves.map((move) => (
            <p key={move.move.name}>{move.move.name}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PokemonDetails
