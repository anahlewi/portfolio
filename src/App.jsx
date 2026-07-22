import { useState, useRef } from 'react'
import LandingPage from './components/LandingPage'
import PixelModal from './components/PixelModal'
import PixelTransition from './components/pixel-transition'
import Resume from './components/menu/content/Resume'
import Portfolio from './components/menu/content/Portfolio'
import Contact from './components/menu/content/Contact'

export default function App() {
  const [activeSection, setActiveSection] = useState(null)
  const [showBio, setShowBio] = useState(false)
  const [bioOpenKey, setBioOpenKey] = useState(0)
  const [transitionActive, setTransitionActive] = useState(false)
  const [bioTransitioning, setBioTransitioning] = useState(false)
  const timerRef = useRef(null)
  const bioTimerRef = useRef(null)

  const runTransition = (fn) => {
    clearTimeout(timerRef.current)
    setTransitionActive(true)
    timerRef.current = setTimeout(() => {
      fn()
      timerRef.current = setTimeout(() => setTransitionActive(false), 100)
    }, 800)
  }

  const runBioTransition = (fn) => {
    clearTimeout(bioTimerRef.current)
    setBioTransitioning(true)
    bioTimerRef.current = setTimeout(() => {
      fn()
      bioTimerRef.current = setTimeout(() => setBioTransitioning(false), 100)
    }, 800)
  }

  const open = (section) => {
    if (section === 'about') {
      runBioTransition(() => {
        setShowBio(true)
        setActiveSection('about')
        setBioOpenKey(k => k + 1)
      })
      return
    }
    if (showBio) {
      runTransition(() => { setShowBio(false); setActiveSection(section) })
    } else {
      runTransition(() => setActiveSection(section))
    }
  }

  const close = () => runTransition(() => setActiveSection(null))
  const closeBio = () => runBioTransition(() => { setShowBio(false); setActiveSection(null) })

  return (
    <>
      <LandingPage
        showBio={showBio}
        bioOpenKey={bioOpenKey}
        hidden={transitionActive}
        bioTransitioning={bioTransitioning}
        onOpen={open}
        onCloseBio={closeBio}
      />

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
