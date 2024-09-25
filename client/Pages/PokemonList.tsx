import { useState } from 'react'
import { usePokemon } from '../hooks/usePokemon'
import PokemonCard from '../components/PokemonCard'
import SearchBar from '../components/UI/SearchBar'
import TypeFilter from '../components/UI/TypeFilter'

function PokemonList() {
  const generationNumber = 1

  const { data, isError, isFetching } = usePokemon(generationNumber)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const filteredPokemon = data?.filter((pokemon) => {
    const paddedId = pokemon.id.toString().padStart(4, '0')
    const matchesSearchTerm =
      pokemon.name.includes(searchTerm.toLowerCase()) ||
      paddedId.includes(searchTerm.padStart(4, '0'))

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
            <p>No Pokémon matches your criteria!</p>
          )}
        </div>
      </section>
    )
}

export default PokemonList
