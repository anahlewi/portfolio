import { useCallback, useEffect, useState } from 'react'
import styles from './PixelBurst.module.css'

const COLORS = ['#000000']
const PIXEL_COUNT = 10
const PIXEL_SIZE = 3
const DURATION = 500 // ms — keep in sync with the CSS animation duration

let uid = 0

export default function PixelBurst() {
  const [bursts, setBursts] = useState([])

  const handleClick = useCallback((e) => {
    const id = ++uid
    const pixels = Array.from({ length: PIXEL_COUNT }, (_, i) => {
      const angle = (Math.PI * 2 * i) / PIXEL_COUNT + Math.random() * 0.3
      const distance = 36 + Math.random() * 16
      return {
        key: i,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        size: PIXEL_SIZE,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 40,
      }
    })

    setBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY, pixels }])
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id))
    }, DURATION + 100)
  }, [])

  useEffect(() => {
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [handleClick])

  return (
    <div className={styles.overlay} aria-hidden="true">
      {bursts.map((burst) => (
        <div key={burst.id} className={styles.burst} style={{ left: burst.x, top: burst.y }}>
          {burst.pixels.map((p) => (
            <span
              key={p.key}
              className={styles.pixel}
              style={{
                width: p.size,
                height: p.size,
                background: p.color,
                '--dx': `${p.dx}px`,
                '--dy': `${p.dy}px`,
                animationDelay: `${p.delay}ms`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
