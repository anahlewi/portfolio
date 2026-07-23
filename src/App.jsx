import { useState, useRef } from 'react'
import LandingPage from './components/LandingPage'
import PixelModal from './components/PixelModal'
import PixelTransition from './components/pixel-transition'
import Bio from './components/menu/content/bio'

export default function App() {
  const [activeSection, setActiveSection] = useState(null)
  const [transitionActive, setTransitionActive] = useState(false)
  const timerRef = useRef(null)

  const runTransition = (fn) => {
    clearTimeout(timerRef.current)
    setTransitionActive(true)
    timerRef.current = setTimeout(() => {
      fn()
      timerRef.current = setTimeout(() => setTransitionActive(false), 100)
    }, 800)
  }

  const open = (section) => runTransition(() => setActiveSection(section))
  const close = () => runTransition(() => setActiveSection(null))

  return (
    <>
      <LandingPage hidden={transitionActive} onOpen={open} />

      {activeSection === 'about' && (
        <PixelModal onClose={close}><Bio /></PixelModal>
      )}
      <PixelTransition menuIsActive={transitionActive} />
    </>
  )
}
