import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import PokemonDetails from './Pages/PokemonDetails.tsx'
import PokemonList from './Pages/PokemonList.tsx'
import ErrorPage from './Pages/ErrorPage.tsx'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<PokemonList />} />
    <Route path="/pokemon/:id" element={<PokemonDetails />} />
  </Route>
)
