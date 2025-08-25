import { useState, useEffect } from 'react'

export const useBuyback = (purchasePrice: number, purchaseDate: string) => {
  const [buybackValue, setBuybackValue] = useState<number>(0)

  useEffect(() => {
    if (!purchasePrice || !purchaseDate) return

    const parsedDate = new Date(purchaseDate)
    if (isNaN(parsedDate.getTime())) return

    const today = new Date()
    const diffTime = today.getTime() - parsedDate.getTime()
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365)
    const yearsPassed = Math.floor(diffYears)

    const value = purchasePrice * Math.pow(0.5, yearsPassed)

    setBuybackValue(Math.max(value, 0))
  }, [purchasePrice, purchaseDate])

  return { buybackValue }
}
