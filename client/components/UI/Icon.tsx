import classNames from 'classnames'

interface Props {
  children: React.ReactNode
  backgroundColor?: string
}

// Color mapping for the background
const colorMap: { [key: string]: string } = {
  normal: 'bg-normal',
  fire: 'bg-fire',
  water: 'bg-water',
  electric: 'bg-electric',
  grass: 'bg-grass',
  ice: 'bg-ice',
  fighting: 'bg-fighting',
  poison: 'bg-poison',
  ground: 'bg-ground',
  flying: 'bg-flying',
  psychic: 'bg-psychic',
  bug: 'bg-bug',
  rock: 'bg-rock',
  ghost: 'bg-ghost',
  dragon: 'bg-dragon',
  dark: 'bg-dark',
  steel: 'bg-steel',
  fairy: 'bg-fairy',
}

function Icon({ children, backgroundColor, ...props }: Props) {
  const bgColor =
    backgroundColor && colorMap[backgroundColor]
      ? colorMap[backgroundColor]
      : 'bg-slate-400'

  // Determine text color based on the type
  const textColor =
    backgroundColor === 'fighting' ||
    backgroundColor === 'poison' ||
    backgroundColor === 'ghost' ||
    backgroundColor === 'dragon'
      ? 'text-white'
      : 'text-black'

  return (
    <div
      className={classNames(
        'w-20 flex justify-center items-center rounded p-2 m-2',
        bgColor
      )}
      {...props}
    >
      <p className={classNames('text-sm font-body', textColor)}>{children}</p>
    </div>
  )
}

export default Icon
