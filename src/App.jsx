import { useState, useRef } from 'react'
import LandingPage from './components/LandingPage'
import PixelModal from './components/PixelModal'
import PixelTransition from './components/pixel-transition'
import Bio from './components/menu/content/bio'
import Resume from './components/menu/content/Resume'
import Portfolio from './components/menu/content/Portfolio'
import Contact from './components/menu/content/Contact'

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
        <PixelModal title="about" onClose={close}><Bio /></PixelModal>
      )}

      {activeSection === 'resume' && (
        <PixelModal title="resume" onClose={close}><Resume /></PixelModal>
      )}

      {activeSection === 'portfolio' && (
        <PixelModal title="portfolio" onClose={close}><Portfolio /></PixelModal>
      )}

      {activeSection === 'contact' && (
        <PixelModal title="contact" onClose={close}><Contact /></PixelModal>
      )}
      <PixelTransition menuIsActive={transitionActive} />
    </>
  )
}
