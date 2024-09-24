import { SetStateAction } from 'react'
import types from '../../data/types'

interface Props {
  selectedType: string
  setSelectedType: React.Dispatch<SetStateAction<string>>
}

function TypeFilter({ selectedType, setSelectedType }: Props) {
  return (
    <select
      value={selectedType}
      onChange={(e) => setSelectedType(e.target.value)}
      className="border p-2 rounded"
      aria-label="filter by pokemon type here"
    >
      <option value="">All Types</option>
      {types.map((type) => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  )
}

export default TypeFilter
