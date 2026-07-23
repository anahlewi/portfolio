import { useState } from 'react'
import styles from './bio.module.css'
import Typewriter from '../../Typewriter'

export default function Bio() {
  const [showLink, setShowLink] = useState(false)
  const BIO = `Hello! My name is Anah, pronounced Ah-na. I am a creative technologist and Software Engineer residing in Brooklyn, NY.\n\nI am a multi-disciplinary artist specializing in digital archiving, data visualization, photography and videography. Currently looking to explore more experiential work, live coding and vjing opportunities. \n Looking for my work, checkout my `

  return (
    <div className={styles.wrapper}>
      <Typewriter text={BIO} speed={50} delay={900} onDone={() => setShowLink(true)} />
      {showLink && (
        <a className={styles.link} href="https://flaka.design" target="_blank" rel="noreferrer">
        computer desktop
        </a>
      )}
    </div>
  )
}
