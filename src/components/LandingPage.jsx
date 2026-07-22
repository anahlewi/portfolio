import styles from './LandingPage.module.css'
import NavMenu from './menu'
import ParticleName from './ParticleName'

export default function LandingPage({ hidden, onOpen }) {
  return (
    <>
      <svg className={styles.svgHidden}>
        <defs>
          <filter id="pixel" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feFlood x="0" y="0" width="100%" height="100%" result="back" floodColor="transparent" />
            <feComposite in="SourceGraphic" in2="back" operator="over" result="comp" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="mask" />
            <feComposite in="comp" in2="mask" operator="in" />
          </filter>
        </defs>
      </svg>

      <div className={styles.page} style={{ visibility: hidden ? 'hidden' : 'visible' }}>
        <div className={styles.center}>
          <ParticleName text="anah lewi" />
        </div>
        <NavMenu onOpen={onOpen} />
      </div>
    </>
  )
}
