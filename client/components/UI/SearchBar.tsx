interface Props {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

function SearchBar({ searchTerm, setSearchTerm }: Props) {
  return (
    <div className="mb-4">
      <input
        aria-label="search for a pokemon here"
        type="text"
        placeholder="Search by name or number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded w-full max-w-screen-lg mx-auto block"
      />
    </div>
  )
}
export default SearchBar
