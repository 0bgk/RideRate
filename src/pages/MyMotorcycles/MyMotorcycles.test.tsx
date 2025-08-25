import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import MyMotorcycles from './MyMotorcycles'
import { useMotorcycles } from '../../hooks/useMotorcycles'

// Mock components and hooks
vi.mock('../../hooks/useMotorcycles', () => ({
  useMotorcycles: vi.fn(),
}))

vi.mock('../../components/MotorcycleCard/MotorcycleCard', () => ({
  default: ({ id }: { id: string }) => <div data-testid={`motorcycle-${id}`}></div>,
}))

vi.mock('../../components/Search/Search', () => ({
  default: ({ search }: { search: string }) => <div data-testid="search">{search}</div>,
}))

describe('MyMotorcycles', () => {
  const mockShowMore = vi.fn()
  const mockSetSearch = vi.fn()
  const mockSetInputValue = vi.fn()

  const mockedUseMotorcycles = vi.mocked(useMotorcycles)

  // Test Case 1: Renders "no motorcycles found" when list is empty
  it('renders "no motorcycles found" message when filtered list is empty', () => {
    mockedUseMotorcycles.mockReturnValue({
      motorcycles: [],
      filteredMotorcycles: [],
      inputValue: '',
      setInputValue: mockSetInputValue,
      setSearch: mockSetSearch,
      visibleCount: 0,
      showMore: mockShowMore,
      search: '',
    })

    render(<MyMotorcycles />)
    // Using toBeDefined() to check for existence
    expect(screen.getByText(/No motorcycles found/i)).toBeDefined()
    // Using toBeNull() to check for non-existence
    expect(screen.queryByTestId('motorcycle-1')).toBeNull()
  })

  // Test Case 2: Renders motorcycles and the "Show More" button when applicable
  it('renders motorcycles and the "Show More" button', () => {
    const mockMotorcycleData = {
      id: '1',
      modelo: 'X',
      nombre: 'Y',
      precioCompra: 1000,
      fechaCompra: new Date(),
      coordenadas: { latitud: 0, longitud: 0 },
    }
    const mockMotorcycles = [mockMotorcycleData, { ...mockMotorcycleData, id: '2' }]

    mockedUseMotorcycles.mockReturnValue({
      motorcycles: mockMotorcycles,
      filteredMotorcycles: mockMotorcycles,
      inputValue: 'X',
      setInputValue: mockSetInputValue,
      setSearch: mockSetSearch,
      visibleCount: 1,
      showMore: mockShowMore,
      search: 'X',
    })

    render(<MyMotorcycles />)

    // Using toThrow() with getBy* to check for non-existence
    expect(() => screen.getByTestId('motorcycle-1')).not.toThrow()
    // Using toBeNull() to check for non-existence
    expect(screen.queryByTestId('motorcycle-2')).toBeNull()

    // Using toBeDefined() to check for existence
    expect(screen.getByRole('button', { name: /Show More/i })).toBeDefined()
  })

  it('calls the showMore function when "Show More" button is clicked', () => {
    const mockMotorcycles = [{ id: '1' }, { id: '2' }] as any;

    mockedUseMotorcycles.mockReturnValue({
      motorcycles: mockMotorcycles,
      filteredMotorcycles: mockMotorcycles,
      inputValue: '',
      setInputValue: vi.fn(),
      setSearch: vi.fn(),
      visibleCount: 1,
      showMore: mockShowMore,
      search: '',
    })

    render(<MyMotorcycles />)

    const showMoreButton = screen.getByRole('button', { name: /Show More/i })
    fireEvent.click(showMoreButton)

    expect(mockShowMore).toHaveBeenCalledTimes(1)
  })
})