import { ROUTES } from '../../routes/routes'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import React from 'react'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} aria-label="RideRate Home">
          RideRate
        </Link>

        <nav className={styles.mainNav}>
          <ul className={styles.navList}>
            <li>
              <Link to={ROUTES.motorcycles} className={styles.navLink}>
                My Motorcycles
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
