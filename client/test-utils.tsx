import { beforeEach, expect } from 'vitest'
import { cleanup, render } from '@testing-library/react/pure'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom/vitest'
import { routes } from './routes'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import userEvent from '@testing-library/user-event'

beforeEach(cleanup)
expect.extend(matchers)

export function setupApp(route = '/') {
  const router = createMemoryRouter(routes, {
    initialEntries: [route],
  })

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  })

  const screen = render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )

  const user = userEvent.setup()
  return { user, ...screen }
}

export const mockPokemonData = [
  {
    id: 1,
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    sprites: {
      front_default: 'test-front-bulbasaur.png',
      back_default: 'test-back-bulbasaur.png',
    },
    base_experience: 64,
    cries: {
      latest: 'test-latest-cry-bulbasaur.ogg',
      legacy: 'test-legacy-cry-bulbasaur.ogg',
    },
    abilities: [
      {
        ability: { name: 'Overgrow', url: 'test-ability' },
        is_hidden: false,
        slot: 1,
      },
      {
        ability: { name: 'Chlorophyll', url: 'test-ability' },
        is_hidden: true,
        slot: 3,
      },
    ],
    moves: [
      {
        move: { name: 'Tackle', url: 'test-move' },
      },
      {
        move: { name: 'Vine Whip', url: 'test-move' },
      },
    ],
    types: [
      {
        slot: 1,
        type: { name: 'grass', url: 'test-type' },
      },
      {
        slot: 2,
        type: { name: 'poison', url: 'test-type' },
      },
    ],
  },
  {
    id: 4,
    name: 'charmander',
    height: 6,
    weight: 85,
    sprites: {
      front_default: 'test-front-charmander.png',
      back_default: 'test-back-charmander.png',
    },
    base_experience: 62,
    cries: {
      latest: 'test-latest-cry-charmander.ogg',
      legacy: 'test-legacy-cry-charmander.ogg',
    },
    abilities: [
      {
        ability: { name: 'Blaze', url: 'test-ability' },
        is_hidden: false,
        slot: 1,
      },
      {
        ability: { name: 'Solar Power', url: 'test-ability' },
        is_hidden: true,
        slot: 3,
      },
    ],
    moves: [
      {
        move: { name: 'Scratch', url: 'test-move' },
      },
      {
        move: { name: 'Ember', url: 'test-move' },
      },
    ],
    types: [
      {
        slot: 1,
        type: { name: 'fire', url: 'test-type' },
      },
    ],
  },
]

export const mockUnknownPokemonData = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  sprites: {
    front_default: 'test-front-bulbasaur.png',
    back_default: 'test-back-bulbasaur.png',
  },
  base_experience: 64,
  cries: {
    latest: 'test-latest-cry-bulbasaur.ogg',
    legacy: 'test-legacy-cry-bulbasaur.ogg',
  },
  abilities: [
    {
      ability: { name: 'Overgrow', url: 'test-ability' },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: { name: 'Chlorophyll', url: 'test-ability' },
      is_hidden: true,
      slot: 3,
    },
  ],
  moves: [
    {
      move: { name: 'Tackle', url: 'test-move' },
    },
    {
      move: { name: 'Vine Whip', url: 'test-move' },
    },
  ],
  types: [
    {
      slot: 1,
      type: { name: 'unknown', url: 'test-type' },
    },
    {
      slot: 2,
      type: { name: 'unknown', url: 'test-type' },
    },
  ],
}
