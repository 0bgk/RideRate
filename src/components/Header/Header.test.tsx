import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'

describe('Header component', () => {
  it('renders the logo', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    const logo = getByLabelText('RideRate Home')
    expect(logo).toBeDefined()
  })

  it('renders the My Motorcycles link', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    const link = getByText('My Motorcycles')
    expect(link).toBeDefined()
  })
})
