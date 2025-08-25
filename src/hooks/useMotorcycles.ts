import { useState, useEffect, useMemo } from 'react'
import type { Motorcycle } from '../components/MotorcycleCard/MotorcycleCard'

interface UseMotorcyclesResult {
  motorcycles: Motorcycle[]
  filteredMotorcycles: Motorcycle[]
  inputValue: string
  setInputValue: (value: string) => void
  search: string
  setSearch: (value: string) => void
  visibleCount: number
  showMore: () => void
}

export const useMotorcycles = (): UseMotorcyclesResult => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [visibleCount, setVisibleCount] = useState<number>(8)

  useEffect(() => {
    const fetchMotorcycles = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/motos`)
        const data: Motorcycle[] = await res.json()
        setMotorcycles(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchMotorcycles()
  }, [])

  const filteredMotorcycles = useMemo<Motorcycle[]>(
    () =>
      motorcycles.filter(m =>
        m.nombre.toLowerCase().includes(search.toLowerCase())
      ),
    [motorcycles, search]
  )

  const showMore = () => setVisibleCount(prev => prev + 8)

  return {
    motorcycles,
    filteredMotorcycles,
    inputValue,
    setInputValue,
    search,
    setSearch,
    visibleCount,
    showMore,
  }
}
