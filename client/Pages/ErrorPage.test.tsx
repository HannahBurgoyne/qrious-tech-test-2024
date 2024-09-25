// @vitest-environment jsdom
import { mockUnknownPokemonData, setupApp } from '../test-utils'
import { beforeAll, describe, it, expect } from 'vitest'
import nock from 'nock'
import { mockPokemonData } from '../test-utils'
import { render } from '@testing-library/react'

beforeAll(() => {
  nock.disableNetConnect()
})

describe('ErrorPage', () => {
  it('shows an error page if the user navigates to a non-existent route', async () => {
    const { ...screen } = setupApp('/idontexist')

    const errHeading = await screen.findByRole('heading', { level: 1 })
    expect(errHeading).toBeInTheDocument()

    const img = await screen.findByAltText(
      'a gif of squirtle on his back crying'
    )
    expect(img).toBeInTheDocument()

    const link = await screen.findByRole('link')
    expect(link).toBeInTheDocument()
  })
})
