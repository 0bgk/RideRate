import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import MotorcycleDetail from './MotorcycleDetail'
import { ROUTES } from '../../routes/routes'

// Mock react-router-dom navigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const current = await importOriginal()
  return {
    ...current,
    useNavigate: () => mockNavigate,
  }
})

// Mock hooks
vi.mock('../../hooks/useMotorcycles', () => ({
  useMotorcycles: () => ({
    motorcycles: [],
    inputValue: '',
    setInputValue: vi.fn(),
    setSearch: vi.fn(),
  }),
}))
vi.mock('../../hooks/useMotorcycleDetail', () => ({
  useMotorcycleDetail: () => ({
    selectedMotorcycle: null,
  }),
}))

describe('MotorcycleDetail', () => {
  it('calls navigate with ROUTES.home when "Go back" button is clicked', () => {
    const { getByRole } = render(<MotorcycleDetail />)
    const button = getByRole('button', { name: /go back/i })
    fireEvent.click(button)
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.home)
  })
})
