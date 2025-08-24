import { useNavigate } from 'react-router-dom'
import styles from './NotFound.module.css'
import { ROUTES } from '../../routes/routes'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <section className={styles.container} aria-labelledby="page-not-found-heading">
      <h1 id="page-not-found-heading" className={styles.heading}>
        Page not found
      </h1>
      <p className={styles.message}>
        Sorry, the page you are looking for does not exist on our domain. We recommend you to return to the homepage to continue browsing.
      </p>
      <button
        className={styles.button}
        onClick={() => navigate(ROUTES.home)}
        aria-label="Go to homepage"
        title="Go to homepage"
      >
        Go to home
      </button>
    </section>
  )
}

export default NotFound
