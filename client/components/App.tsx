import { Outlet } from 'react-router-dom'
import PokemonList from './PokemonList'

function App() {
  return (
    <>
      <div className="app">
        <Outlet />
      </div>
    </>
  )
}

export default App
