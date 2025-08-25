import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Modal from './Modal'

describe('Modal', () => {
  it('does not render when isOpen is false', () => {
    const { queryByRole } = render(
      <Modal isOpen={false} onClose={() => {}} ariaLabel="Test Modal">
        <p>Content</p>
      </Modal>
    )
    expect(queryByRole('dialog')).toBeNull()
  })

  it('renders correctly when isOpen is true', () => {
    const { getByRole, getByText } = render(
      <Modal isOpen={true} onClose={() => {}} ariaLabel="Test Modal">
        <p>Content</p>
      </Modal>
    )
    expect(getByRole('dialog')).toBeTruthy()
    expect(getByText('Content')).toBeTruthy()
  })

  it('calls onClose when clicking on the overlay', () => {
    const onClose = vi.fn()
    const { getByRole } = render(
      <Modal isOpen={true} onClose={onClose} ariaLabel="Test Modal">
        <p>Content</p>
      </Modal>
    )
    fireEvent.click(getByRole('dialog'))
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onClose when pressing Escape', () => {
    const onClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={onClose} ariaLabel="Test Modal">
        <p>Content</p>
      </Modal>
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalled()
  })
})
