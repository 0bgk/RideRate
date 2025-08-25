import { render, fireEvent, screen } from '@testing-library/react'
import type { Motorcycle } from '../MotorcycleCard/MotorcycleCard'
import { describe, it, expect, vi } from 'vitest'
import Search from './Search'

// Mock CSS module
vi.mock('./Search.module.css', () => ({
  default: {
    banner: 'banner',
    imageContainer: 'imageContainer',
    bannerImage: 'bannerImage',
    bannerContent: 'bannerContent',
    searchForm: 'searchForm',
    searchFormTexts: 'searchFormTexts',
    searchFormInputs: 'searchFormInputs',
    searchInput: 'searchInput',
    searchButton: 'searchButton',
  },
}))

// Mock image
vi.mock('../../assets/images/banner.jpg', () => ({
  default: 'mockBanner.jpg',
}))

const mockMotorcycles: Motorcycle[] = [
  { id: '1', fechaCompra: new Date().toDateString(), precioCompra: 1000, modelo: 'X', nombre: 'Y', coordenadas: { latitud: 0, longitud: 0 } },
  { id: '2', fechaCompra: new Date().toDateString(), precioCompra: 2000, modelo: 'A', nombre: 'B', coordenadas: { latitud: 0, longitud: 0 } },
]

describe('Search', () => {
  it('renders correctly with motorcycles', () => {
    render(
      <Search search="" setSearch={vi.fn()} motorcycles={mockMotorcycles} onSearch={vi.fn()} />
    )

    expect(screen.getByAltText(/front view of modern motorcycles/i)).toBeTruthy()
    expect(screen.getByLabelText(/search motorcycles/i)).toBeTruthy()
    expect(screen.getByText(`(${mockMotorcycles.length}) Motos`)).toBeTruthy()
  })

  it('calls setSearch when input changes', () => {
    const setSearch = vi.fn()
    render(
      <Search search="" setSearch={setSearch} motorcycles={mockMotorcycles} onSearch={vi.fn()} />
    )

    const input = screen.getByLabelText(/search motorcycles/i)
    fireEvent.change(input, { target: { value: 'Honda' } })

    expect(setSearch).toHaveBeenCalledWith('Honda')
  })

  it('calls onSearch on form submit', () => {
    const onSearch = vi.fn()
    render(
      <Search search="X" setSearch={vi.fn()} motorcycles={mockMotorcycles} onSearch={onSearch} />
    )

    fireEvent.click(screen.getByText(/search inventory/i))
    expect(onSearch).toHaveBeenCalled()
  })

  it('does not render form when disabled', () => {
    render(
      <Search search="" setSearch={vi.fn()} motorcycles={mockMotorcycles} onSearch={vi.fn()} disable />
    )

    expect(screen.queryByLabelText(/search motorcycles/i)).toBeNull()
  })
})