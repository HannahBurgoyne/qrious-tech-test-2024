import { usePokemon } from '../hooks/usePokemon'
import PokemonDetails from './PokemonDetails'
import Icon from './UI/Icon'

function PokemonList() {
  const { data, isError, isFetching } = usePokemon(1)

  if (isFetching) return <p>Loading...</p>

  if (isError) return <p>Oops, error!</p>

  if (data)
    return (
      <section className="grid grid-cols-4 gap-4 p-6 bg-slate-400">
        {data.map((pokemon) => (
          <div className="bg-white p-6 rounded">
            <h1 className="font-heading text-xl font-semibold">
              {pokemon.name}
            </h1>
            <h2 className="font-heading text-lg font-light">{`#00${pokemon.id}`}</h2>
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
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            {/* <PokemonDetails pokemon={pokemon} /> */}
          </div>
        ))}
      </section>
    )
}

export default PokemonList
