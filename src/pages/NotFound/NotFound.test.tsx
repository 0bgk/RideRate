import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import NotFound from './NotFound'
import { ROUTES } from '../../routes/routes'

// Mock react-router-dom navigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

describe('NotFound', () => {
  it('renders the heading and message', () => {
    const { getByText } = render(<NotFound />)
    expect(getByText('Page not found')).toBeTruthy()
    expect(
      getByText(/Sorry, the page you are looking for does not exist/i)
    ).toBeTruthy()
  })

  it('calls navigate to home on button click', () => {
    const { getByRole } = render(<NotFound />)
    fireEvent.click(getByRole('button'))
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.home)
  })
})
