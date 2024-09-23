import classNames from 'classnames'

interface Props {
  children: React.ReactNode
  backgroundColor?: string
}

// because Tailwind cannot dynamically render colors at runtime, this logic is necessary to render icon color based on the pokemon type
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

  return (
    <div className={classNames('rounded p-2', bgColor)} {...props}>
      {children}
    </div>
  )
}

export default Icon
