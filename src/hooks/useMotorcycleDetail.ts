import { useState, useEffect } from 'react'
import type { Motorcycle } from '../components/MotorcycleCard/MotorcycleCard'
import { useParams } from 'react-router-dom'

export const useMotorcycleDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [selectedMotorcycle, setSelectedMotorcycle] = useState<Motorcycle | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchMotorcycleDetail = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/motos/${id}`)
        const data: Motorcycle = await res.json()
        setSelectedMotorcycle(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchMotorcycleDetail()
  }, [id])

  return { selectedMotorcycle }
}
