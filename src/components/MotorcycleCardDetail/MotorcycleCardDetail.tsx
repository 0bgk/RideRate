import type { Motorcycle } from '../MotorcycleCard/MotorcycleCard'
import defaultImage from '../../assets/images/moto.jpg'
import styles from './MotorcycleCardDetail.module.css'
import { useState, useEffect, useRef } from 'react'
import Modal from '../Modal/Modal'

const MotorcycleCardDetail = ({ modelo, nombre, precioCompra }: Motorcycle) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const formattedPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(precioCompra)

  useEffect(() => {
    if (isOpen) closeBtnRef.current?.focus()
  }, [isOpen])

  return (
    <article className={styles.card}>
      <figure>
        <img
          src={defaultImage}
          alt={`Motorcycle ${modelo} ${nombre}`}
          className={styles.image}
        />
        <figcaption className={styles.imageCaption}>
          {modelo} {nombre}
        </figcaption>
      </figure>

      <div className={styles.infoContainer}>
        <div className={styles.details}>
          <h2 className={styles.titles}>
            <span className={styles.model}>{modelo}</span>
            <span className={styles.brand}>{nombre}</span>
          </h2>
          <p className={styles.info}>
            The value shown below is an approximate estimate of the buyback price.
            An appraisal at a workshop is required. Please consult your dealer for a firm offer.
          </p>
        </div>

        <div className={styles.priceContainer}>
          <div className={styles.priceBox}>
            <span className={styles.buyback}>Buyback value</span>
            <strong className={styles.price}>{formattedPrice}</strong>
          </div>
        </div>

        <button
          className={styles.button}
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
        >
          Request an appointment
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} ariaLabel="Appointment request modal">
        <h3 className={styles.titleConfirmation}>Appointment requested</h3>
        <p className={styles.messageConfirmation}>Your dealership will contact you soon to schedule an appointment.</p>
        <p className={styles.messageConfirmation}>Thank you very much for trusting us.</p>
      </Modal>
    </article>
  )
}

export default MotorcycleCardDetail
