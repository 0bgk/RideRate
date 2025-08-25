import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import type { Motorcycle } from './MotorcycleCard'
import { MemoryRouter } from 'react-router-dom'
import MotorcycleCard from './MotorcycleCard'
import { ROUTES } from '../../routes/routes' 

// Mock CSS module
vi.mock('./MotorcycleCard.module.css', () => ({
  default: {
    card: 'card',
    image: 'image',
    infoContainer: 'infoContainer',
    details: 'details',
    model: 'model',
    name: 'name',
    priceContainer: 'priceContainer',
    priceBox: 'priceBox',
    price: 'price',
  },
}))

// Mock image
vi.mock('../../assets/images/moto.jpg', () => ({
  default: 'mockImage.jpg',
}))

// Mock de useNavigate
const mockUseNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return {
    ...actual,
    useNavigate: () => mockUseNavigate,
  }
})

const mockMotorcycle: Motorcycle = {
  id: '1',
  fechaCompra: new Date(),
  precioCompra: 12000,
  modelo: 'Model X',
  nombre: 'Brand Y',
  coordenadas: {
    latitud: 41.4,
    longitud: 2.2,
  },
}

describe('MotorcycleCard', () => {
  beforeEach(() => {
    mockUseNavigate.mockClear()
  })

  it('renders model, name, and formatted price', () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter>
        <MotorcycleCard {...mockMotorcycle} />
      </MemoryRouter>
    )

    expect(getByText(mockMotorcycle.modelo)).toBeTruthy()
    expect(getByText(mockMotorcycle.nombre)).toBeTruthy()

    // Solo una de las soluciones para el precio
    expect(getByText(/12\.000,00/)).toBeTruthy()

    expect(getByAltText(`${mockMotorcycle.modelo} ${mockMotorcycle.nombre}`)).toBeTruthy()
  })

  it('calls navigate with correct route on click', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <MotorcycleCard {...mockMotorcycle} />
      </MemoryRouter>
    )

    const button = getByRole('button')
    fireEvent.click(button)

    const expectedRoute = ROUTES.motorcycleDetail.replace(':id', mockMotorcycle.id)
    expect(mockUseNavigate).toHaveBeenCalledWith(expectedRoute)
  })
})