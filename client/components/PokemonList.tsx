import { useState } from 'react'
import { usePokemon } from '../hooks/usePokemon'
import PokemonCard from './PokemonCard'
import SearchBar from './UI/SearchBar'

function PokemonList() {
  const { data, isError, isFetching } = usePokemon(1)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPokemon = data?.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.id.toString() === searchTerm
  )

  if (isFetching) return <p>Loading...</p>

  if (isError) return <p>Oops, error!</p>

  if (filteredPokemon)
    return (
      <section className="bg-background p-10">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="grid grid-cols-4 gap-4 p-6">
          {filteredPokemon.length > 0 ? (
            filteredPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
          ) : (
            <p>No Pokémon found!</p>
          )}
        </div>
      </section>
    )
}

export default PokemonList
