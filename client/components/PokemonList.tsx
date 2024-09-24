import { useState } from 'react'
import { usePokemon } from '../hooks/usePokemon'
import PokemonCard from './PokemonCard'
import SearchBar from './UI/SearchBar'
import TypeFilter from './UI/TypeFilter'

function PokemonList() {
  const { data, isError, isFetching } = usePokemon(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const filteredPokemon = data?.filter((pokemon) => {
    const matchesSearchTerm =
      pokemon.name.includes(searchTerm.toLowerCase()) ||
      pokemon.id.toString().includes(searchTerm)
    const matchesType = selectedType
      ? pokemon.types.some((type) => type.type.name === selectedType)
      : true

    return matchesSearchTerm && matchesType
  })

  if (isFetching) return <p>Loading...</p>

  if (isError) return <p>Oops, error!</p>

  if (filteredPokemon)
    return (
      <section className="bg-background p-10">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TypeFilter
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
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
