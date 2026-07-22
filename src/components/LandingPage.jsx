import { useRef } from 'react'
import styles from './LandingPage.module.css'
import NavMenu from './menu'
import Bio from './menu/content/bio'
import PixelTransition from './pixel-transition'

export default function LandingPage({ showBio, bioOpenKey, hidden, bioTransitioning, onOpen, onCloseBio }) {
  const centerRef = useRef(null)

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
        <div ref={centerRef} className={styles.center}>
          <PixelTransition menuIsActive={bioTransitioning} contained containerRef={centerRef} />
          {showBio
            ? <Bio onCloseBio={onCloseBio} openKey={bioOpenKey} />
            : <h1 className="pixel-title">anah lewi</h1>
          }
        </div>
        <NavMenu onOpen={onOpen} />
      </div>
    </>
  )
}
