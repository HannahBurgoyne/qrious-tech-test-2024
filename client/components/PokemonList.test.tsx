// @vitest-environment jsdom
import { setupApp } from '../test-utils'
import { beforeAll, describe, it, expect } from 'vitest'
import nock from 'nock'

beforeAll(() => {
  nock.disableNetConnect()
})

const mockPokemonData = [
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

describe('PokemonList', () => {
  it('shows a list of pokemon', async () => {
    // Mock the generation fetch response
    const scope = nock('https://pokeapi.co')
      .get('/api/v2/generation/1')
      .reply(200, { pokemon_species: [{ name: 'bulbasaur' }] })

    // Mock the individual Pokemon fetch response
    const pokemonScope = nock('https://pokeapi.co')
      .get('/api/v2/pokemon/bulbasaur')
      .reply(200, mockPokemonData[0])

    const screen = setupApp('/')

    const heading = await screen.findByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('bulbasaur')

    expect(scope.isDone()).toBe(true)
    expect(pokemonScope.isDone()).toBe(true)
  })

  it('filters the list of pokemon by name', async () => {
    // Mock the generation fetch response
    const scope = nock('https://pokeapi.co')
      .get('/api/v2/generation/1')
      .reply(200, {
        pokemon_species: [{ name: 'bulbasaur' }, { name: 'charmander' }],
      })

    // Mock the individual Pokemon fetch responses
    const scope2 = nock('https://pokeapi.co')
      .get('/api/v2/pokemon/bulbasaur')
      .reply(200, mockPokemonData[0])

    const scope3 = nock('https://pokeapi.co')
      .get('/api/v2/pokemon/charmander')
      .reply(200, mockPokemonData[1])

    const { user, ...screen } = setupApp('/')

    await screen.findByText('bulbasaur')
    await screen.findByText('charmander')

    expect(scope.isDone()).toBe(true)
    expect(scope2.isDone()).toBe(true)
    expect(scope3.isDone()).toBe(true)

    const searchInput = await screen.findByPlaceholderText(
      'Search by name or number'
    )

    await user.type(searchInput, 'bulbasaur')

    expect(await screen.findByText('bulbasaur')).toBeInTheDocument()
    expect(screen.queryByText('charmander')).not.toBeInTheDocument()
  })
})
