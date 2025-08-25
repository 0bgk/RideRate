import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { waitFor } from '@testing-library/react'
import { useMotorcycles } from './useMotorcycles'
import type { Motorcycle } from '../components/MotorcycleCard/MotorcycleCard'

describe('useMotorcycles', () => {
  const mockMotorcycles: Motorcycle[] = [
    { id: '1', modelo: 'CB500F', nombre: 'Honda', precioCompra: 5000, fechaCompra: new Date().toDateString(), coordenadas: { latitud: 41.39, longitud: 2.16 } },
    { id: '2', modelo: 'MT-07', nombre: 'Yamaha', precioCompra: 7000, fechaCompra: new Date().toDateString(), coordenadas: { latitud: 40.41, longitud: 2.18 } },
  ]

  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('fetches motorcycles and filters by search', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockMotorcycles),
      } as Response)
    ) as unknown as typeof fetch

    const { result } = renderHook(() => useMotorcycles())

    await waitFor(() => {
      expect(result.current.motorcycles).toEqual(mockMotorcycles)
    })

    act(() => {
      result.current.setSearch('Yamaha')
    })

    expect(result.current.filteredMotorcycles).toEqual([mockMotorcycles[1]])
  })

  it('increments visibleCount when showMore is called', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockMotorcycles),
      } as Response)
    ) as unknown as typeof fetch

    const { result } = renderHook(() => useMotorcycles())

    await waitFor(() => {
      expect(result.current.motorcycles).toEqual(mockMotorcycles)
    })

    expect(result.current.visibleCount).toBe(8)

    act(() => {
      result.current.showMore()
    })

    expect(result.current.visibleCount).toBe(16)
  })
})
