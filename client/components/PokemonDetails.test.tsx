// @vitest-environment jsdom
import { setupApp } from '../test-utils'
import { beforeAll, describe, it, expect } from 'vitest'
import nock from 'nock'
import { mockPokemonData } from '../test-utils'

beforeAll(() => {
  nock.disableNetConnect()
})

describe('PokemonDetails', () => {
  it('shows a single pokemon', async () => {
    // Mock the generation fetch response
    const scope = nock('https://pokeapi.co')
      .get('/api/v2/generation/1')
      .reply(200, { pokemon_species: [{ name: 'bulbasaur' }] })

    // Mock the individual Pokemon fetch response
    const pokemonScope = nock('https://pokeapi.co')
      .get('/api/v2/pokemon/bulbasaur')
      .reply(200, mockPokemonData[0])

    const screen = setupApp('/pokemon/1')

    const heading = await screen.findByText('Base experience:')
    expect(heading).toBeInTheDocument()

    screen.debug()

    const image = await screen.findByAltText('sprite for bulbasaur')
    expect(image).toBeInTheDocument()

    expect(scope.isDone()).toBe(true)
    expect(pokemonScope.isDone()).toBe(true)
  })

  it('renders a grey icon if pokemon type is unknown', async () => {
    // Mock the generation fetch response
    const scope = nock('https://pokeapi.co')
      .get('/api/v2/generation/1')
      .reply(200, { pokemon_species: [{ name: 'bulbasaur' }] })

    // Mock the individual Pokemon fetch response
    const pokemonScope = nock('https://pokeapi.co')
      .get('/api/v2/pokemon/bulbasaur')
      .reply(200, mockPokemonData[0])

    const screen = setupApp('/pokemon/1')
  })
})
