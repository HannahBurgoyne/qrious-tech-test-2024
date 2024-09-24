import { Pokemon } from '../../models/pokemon'

interface Props {
  pokemon: Pokemon
}

function PokemonDetails({ pokemon }: Props) {
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
