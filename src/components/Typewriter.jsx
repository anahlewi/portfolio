import { useState, useEffect } from 'react'

export default function Typewriter({ text, speed = 35, onDone, header, delay = 0 }) {
  const [displayed, setDisplayed] = useState('')
  const [idx, setIdx] = useState(0)
  const [started, setStarted] = useState(delay === 0)

  useEffect(() => {
    if (delay === 0) return
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (idx >= text.length) {
      onDone?.()
      return
    }
    const t = setTimeout(() => {
      setDisplayed(prev => prev + text[idx])
      setIdx(i => i + 1)
    }, speed)
    return () => clearTimeout(t)
  }, [idx, text, speed, onDone, started])

  return (
    header ? 
    <h2 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 'clamp(1rem, 3vw, 2rem)', color: 'white', marginTop: '2rem', marginBottom: '2.5rem', letterSpacing: '0.05em' }}>
      {displayed}
      {idx < text.length && <span className="cursor" />}
    </h2> : <span>
      {displayed} 
      {idx < text.length && <span className="cursor" />}
    </span>
  )
}
