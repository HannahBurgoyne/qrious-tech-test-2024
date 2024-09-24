import { Link } from 'react-router-dom'
import { usePokemon } from '../hooks/usePokemon'
import Icon from './UI/Icon'

function PokemonList() {
  const { data, isError, isFetching } = usePokemon(1)

  if (isFetching) return <p>Loading...</p>

  if (isError) return <p>Oops, error!</p>

  if (data)
    return (
      <section className="grid grid-cols-4 gap-4 p-6 bg-background">
        {data.map((pokemon) => (
          <Link to={`/pokemon/${pokemon.id}`}>
            <div className="bg-white p-6 rounded">
              <h1 className="font-heading text-xl font-semibold">
                {pokemon.name}
              </h1>
              <h2 className="font-heading text-lg font-light">{`#${pokemon.id
                .toString()
                .padStart(4, '0')}`}</h2>
              <div className="flex justify-start">
                {pokemon.types.map((type) => (
                  <Icon backgroundColor={type.type.name}>
                    <p className="text-sm font-body">
                      <a href={`${type.type.url}`}>{type.type.name}</a>
                    </p>
                  </Icon>
                ))}
              </div>
              <img
                src={`${pokemon.sprites.front_default}`}
                alt={`sprite for ${pokemon.name}`}
                className="w-48"
              />
              <div className="flex justify-around items-start">
                <p className="font-body text-md">Height: {pokemon.height}</p>
                <p className="font-body text-md">Weight: {pokemon.weight}lbs</p>
              </div>
              {/* <PokemonDetails pokemon={pokemon} /> */}
            </div>
          </Link>
        ))}
      </section>
    )
}

export default PokemonList
