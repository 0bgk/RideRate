import styles from './Footer.module.css'
import React from 'react'

const Footer: React.FC = () => {
  return (
  <footer className={styles.footer} role="contentinfo">
    <p className={styles.copyright}>
      Copyright © 2025. 0bgk.
    </p>
  </footer>
  )
}

export default Footer
