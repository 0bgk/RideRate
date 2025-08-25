import { useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'
import type { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  ariaLabel: string
}

const Modal = ({ isOpen, onClose, children, ariaLabel }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableEls = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        )
        if (!focusableEls.length) return

        const firstEl = focusableEls[0]
        const lastEl = focusableEls[focusableEls.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault()
            lastEl.focus()
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault()
            firstEl.focus()
          }
        }
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (!isOpen) return
    const bodyStyle = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = bodyStyle
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onClick={onClose}
    >
      <div className={styles.modal} ref={modalRef} onClick={e => e.stopPropagation()}>
        <button
          ref={closeBtnRef}
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal
