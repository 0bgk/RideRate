import type { Motorcycle } from '../MotorcycleCard/MotorcycleCard'
import { render, fireEvent, screen } from '@testing-library/react'
import MotorcycleCardDetail from './MotorcycleCardDetail'
import { describe, it, expect, vi } from 'vitest'

// Mock CSS module
vi.mock('./MotorcycleCardDetail.module.css', () => ({
  default: {
    card: 'card',
    image: 'image',
    imageCaption: 'imageCaption',
    infoContainer: 'infoContainer',
    details: 'details',
    titles: 'titles',
    model: 'model',
    brand: 'brand',
    info: 'info',
    priceContainer: 'priceContainer',
    priceBox: 'priceBox',
    buyback: 'buyback',
    price: 'price',
    button: 'button',
    titleConfirmation: 'titleConfirmation',
    messageConfirmation: 'messageConfirmation',
  },
}))

// Mock image
vi.mock('../../assets/images/moto.jpg', () => ({
  default: 'mockImage.jpg',
}))

const mockMotorcycle: Motorcycle = {
  id: '1',
  fechaCompra: new Date().toDateString(),
  precioCompra: 12000,
  modelo: 'Model X',
  nombre: 'Brand Y',
  coordenadas: { latitud: 41.4, longitud: 2.2 },
}

describe('MotorcycleCardDetail', () => {
  it('renders model, name, and formatted price', () => {
    render(<MotorcycleCardDetail {...mockMotorcycle} />)

    expect(screen.getByText(mockMotorcycle.modelo)).toBeTruthy()
    expect(screen.getByText(mockMotorcycle.nombre)).toBeTruthy()

    expect(screen.getByText(/12\.000,00/)).toBeTruthy()

    expect(screen.getByAltText(`Motorcycle ${mockMotorcycle.modelo} ${mockMotorcycle.nombre}`)).toBeTruthy()
  })

  it('opens modal on button click', () => {
    render(<MotorcycleCardDetail {...mockMotorcycle} />)
    
    const button = screen.getByRole('button', { name: /request an appointment/i })
    fireEvent.click(button)

    expect(screen.getByText(/appointment requested/i)).toBeTruthy()
    expect(screen.getByText(/your dealership will contact you soon/i)).toBeTruthy()
    expect(screen.getByText(/thank you very much for trusting us/i)).toBeTruthy()
  })
})