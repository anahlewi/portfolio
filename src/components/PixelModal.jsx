import { useEffect } from 'react'
import styles from './PixelModal.module.css'
import Typewriter from './Typewriter'

const BG_COLOR = '#000000'

export default function PixelModal({ children, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="modal-backdrop" style={{ background: BG_COLOR }}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>close</button>
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  )
}
