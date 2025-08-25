import defaultImage from '../../assets/images/moto.jpg'
import styles from './MotorcycleCard.module.css'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/routes'
import { useBuyback } from '../../hooks/useBuyback'

export interface Motorcycle {
  id: string
  fechaCompra: string
  precioCompra: number
  modelo: string
  nombre: string
  coordenadas: {
    latitud: number
    longitud: number
  }
}

const MotorcycleCard = ({ id, modelo, nombre, precioCompra, fechaCompra }: Motorcycle) => {
  const { buybackValue } = useBuyback(precioCompra, fechaCompra)
  const navigate = useNavigate()

  const handleCardClick = () => navigate(ROUTES.motorcycleDetail.replace(':id', id))

  const formattedPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(buybackValue)


  return (
    <li
      className={styles.card}
      onClick={handleCardClick}
      role="button"
    >
      <img
        src={defaultImage}
        alt={`${modelo} ${nombre}`}
        className={styles.image}
        loading="lazy"
      />
      <div className={styles.infoContainer}>
        <div className={styles.details}>
          <span className={styles.model}>{modelo}</span>
          <span className={styles.name}>{nombre}</span>
        </div>
        <div className={styles.priceContainer}>
          <div className={styles.priceBox}>
            <span className={styles.price}>{formattedPrice}</span>
          </div>
        </div>
      </div>
    </li>
  )
}

export default MotorcycleCard