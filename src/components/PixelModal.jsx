import { useEffect } from 'react'
import styles from './PixelModal.module.css'
import Typewriter from './Typewriter'

const GRADIENT = 'linear-gradient(160deg, #c8a020 0%, #b8882a 35%, #c45890 100%)'

export default function PixelModal({ title, children, onClose }) {
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
    <div className="modal-backdrop" style={{ background: GRADIENT }}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>[ close ]</button>
        <Typewriter text={title} speed={90} header delay={900} />
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  )
}
