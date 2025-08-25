import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { waitFor } from '@testing-library/react'
import { useMotorcycleDetail } from './useMotorcycleDetail'
import type { Motorcycle } from '../components/MotorcycleCard/MotorcycleCard'

// Mock useParams
vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: '1' }),
}))

describe('useMotorcycleDetail', () => {
  const mockMotorcycle: Motorcycle = {
    id: '1',
    modelo: 'CB500F',
    nombre: 'Honda',
    precioCompra: 5000,
    fechaCompra: new Date().toDateString(),
    coordenadas: { latitud: 41.39, longitud: 2.16 },
  }

  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('fetches and returns motorcycle detail', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockMotorcycle),
      } as Response)
    ) as unknown as typeof fetch

    const { result } = renderHook(() => useMotorcycleDetail())

    await waitFor(() => {
      expect(result.current.selectedMotorcycle).toEqual(mockMotorcycle)
    })

    expect(globalThis.fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/motos/1`)
  })
})
