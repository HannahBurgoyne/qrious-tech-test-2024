import { Link } from 'react-router-dom'
import { Pokemon } from '../../models/pokemon'
import Icon from './UI/Icon'
import convertMeasurement from '../utils/convertMeasurement'

interface Props {
  pokemon: Pokemon
}

function PokemonCard({ pokemon }: Props) {
  return (
    <Link to={`/pokemon/${pokemon.id}`}>
      <div className="bg-white p-6 rounded">
        <h1 className="font-heading text-xl font-semibold">{pokemon.name}</h1>
        <h2 className="font-heading text-lg font-light">{`#${pokemon.id
          .toString()
          .padStart(4, '0')}`}</h2>
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
        <img
          src={`${pokemon.sprites.front_default}`}
          alt={`sprite for ${pokemon.name}`}
          className="w-48"
        />
        <div className="flex justify-around items-start">
          <p className="font-body text-md">
            Height: {convertMeasurement(pokemon.height)}m
          </p>
          <p className="font-body text-md">
            Weight: {convertMeasurement(pokemon.weight)}kgs
          </p>
        </div>
      </div>
    </Link>
  )
}

export default PokemonCard
