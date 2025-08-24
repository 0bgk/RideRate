import { ROUTES } from '../../routes/routes'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import React from 'react'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className='logo'>
          <Link to="/" className={styles.logo} aria-label="RideRate Home">
            Ride <br/> Rate
          </Link>
        </div>

        <nav>
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
