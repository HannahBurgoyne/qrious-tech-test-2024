import { Pokemon } from '../../models/pokemon'

interface Props {
  pokemon: Pokemon
}

function PokemonDetails({ pokemon }: Props) {
  return (
    <section>
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
  )
}

export default PokemonDetails
