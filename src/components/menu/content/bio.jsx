import styles from './bio.module.css'
import Typewriter from '../../Typewriter'

export default function Bio({ onCloseBio, openKey }) {
  const BIO = `Hello! My name is Anah, pronounced Ah-na. I am a creative technologist and Software Engineer residing in Brooklyn, NY.\n\nI am a multi-disciplinary artist specializing in digital archiving, data visualization, photography and videography. Currently looking to explore more experiential work, live coding and vjing opportunities.`

  return (
    <div className={styles.box}>
      <button className={styles.close} onClick={onCloseBio}>✕</button>
      <Typewriter key={openKey} text={BIO} speed={28} delay={800} />
    </div>
  )
}
