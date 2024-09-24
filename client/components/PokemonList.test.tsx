// @vitest-environment jsdom
import { setupApp } from '../test-utils'
import { beforeAll, describe, it, expect } from 'vitest'
import nock from 'nock'
import { waitFor } from '@testing-library/react'
import { mockPokemonData } from '../test-utils'

beforeAll(() => {
  nock.disableNetConnect()
})

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

  it('filters the list of pokemon by type', async () => {
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

    await user.selectOptions(screen.getByRole('combobox'), 'fire')

    expect(await screen.findByText('charmander')).toBeInTheDocument()
    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument()
  })

  it('returns an error message if no pokemon are found', async () => {
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

    await user.selectOptions(screen.getByRole('combobox'), 'flying')

    const errMessage = await screen.getByText(
      'No Pokémon matches your criteria!'
    )

    expect(errMessage).toBeInTheDocument()
  })

  it('displays an error message if the API call fails', async () => {
    const scope = nock('https://pokeapi.co')
      .get('/api/v2/generation/1')
      .reply(500)

    const { user, ...screen } = setupApp('/')

    await waitFor(() => {
      expect(screen.getByText('Oops, error!')).toBeInTheDocument()
    })

    expect(scope.isDone()).toBe(true)
  })
})
