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
    name: 'Bulbasaur',
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
    name: 'Charmander',
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
    expect(heading).toHaveTextContent('Bulbasaur')

    expect(scope.isDone()).toBe(true)
    expect(pokemonScope.isDone()).toBe(true)
  })
})
