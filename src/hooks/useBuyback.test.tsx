import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { waitFor } from '@testing-library/react'
import { useBuyback } from './useBuyback'

describe('useBuyback', () => {
  it('calculates buyback value correctly for 0 years', async () => {
    const today = new Date().toISOString()
    const { result } = renderHook(() => useBuyback(5000, today))

    await waitFor(() => {
      expect(result.current.buybackValue).toBe(5000)
    })
  })

  it('calculates buyback value correctly for 1 year', async () => {
    const lastYear = new Date()
    lastYear.setFullYear(lastYear.getFullYear() - 1)
    const { result } = renderHook(() => useBuyback(5000, lastYear.toISOString()))

    await waitFor(() => {
      expect(result.current.buybackValue).toBeCloseTo(2500)
    })
  })

  it('calculates buyback value correctly for 2 years', async () => {
    const twoYearsAgo = new Date()
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2)
    const { result } = renderHook(() => useBuyback(5000, twoYearsAgo.toISOString()))

    await waitFor(() => {
      expect(result.current.buybackValue).toBeCloseTo(1250)
    })
  })

  it('returns 0 if purchase price is 0', async () => {
    const today = new Date().toISOString()
    const { result } = renderHook(() => useBuyback(0, today))

    await waitFor(() => {
      expect(result.current.buybackValue).toBe(0)
    })
  })

  it('returns 0 if purchase date is invalid', async () => {
    const { result } = renderHook(() => useBuyback(5000, 'invalid-date'))

    await waitFor(() => {
      expect(result.current.buybackValue).toBe(0)
    })
  })
})
