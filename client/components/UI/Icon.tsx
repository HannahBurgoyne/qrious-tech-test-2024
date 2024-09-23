interface Props {
  children: React.ReactNode
}

function Icon({ children, ...props }: Props) {
  return (
    <div className="m-10 rounded px-4 py-2" {...props}>
      {children}
    </div>
  )
}

export default Icon
