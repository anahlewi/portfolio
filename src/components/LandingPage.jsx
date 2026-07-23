import styles from './LandingPage.module.css'
import ParticleName from './ParticleName'
import Hamburger from './Hamburger'

export default function LandingPage({ hidden, onOpen }) {
  return (
    <div className={styles.page} style={{ visibility: hidden ? 'hidden' : 'visible' }}>
      <Hamburger onOpen={onOpen} />
      <div className={styles.center}>
        <div className={styles.particleWrap}>
          <ParticleName text="anah lewi" color="#ffffff" />
        </div>
      </div>
    </div>
  )
}
