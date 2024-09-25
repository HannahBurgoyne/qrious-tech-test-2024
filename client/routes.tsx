import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import PokemonDetails from './Pages/PokemonDetails.tsx'
import PokemonList from './Pages/PokemonList.tsx'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<PokemonList />} />
    <Route path="/pokemon/:id" element={<PokemonDetails />} />
  </Route>
)
