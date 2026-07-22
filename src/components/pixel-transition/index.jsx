import styles from './style.module.css'
import { motion } from 'framer-motion'

const anim = {
  initial: { opacity: 0 },
  open:   (i) => ({ opacity: 1, transition: { duration: 0, delay: 0.03 * i } }),
  closed: (i) => ({ opacity: 0, transition: { duration: 0, delay: 0.04 * i } }),
}

const shuffle = (a) => {
  const arr = [...a]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function PixelTransition({ menuIsActive, contained = false, containerRef }) {
  const getBlocks = (blockSize, nbOfBlocks) => {
    const shuffled = shuffle([...Array(nbOfBlocks)].map((_, i) => i))
    return shuffled.map((randomIndex, index) => (
      <motion.div
        key={index}
        className={styles.block}
        style={{ width: '100%', height: `${blockSize}px` }}
        variants={anim}
        initial="initial"
        animate={menuIsActive ? 'open' : 'closed'}
        custom={randomIndex}
      />
    ))
  }

  const cols = 40
  let blockSize, nbOfBlocks
  if (contained && containerRef?.current) {
    const { width, height } = containerRef.current.getBoundingClientRect()
    blockSize = width / cols
    nbOfBlocks = Math.ceil(height / blockSize)
  } else {
    blockSize = window.innerWidth / cols
    nbOfBlocks = Math.ceil(window.innerHeight / blockSize)
  }

  return (
    <div className={contained ? styles.pixelBackgroundContained : styles.pixelBackground}>
      {[...Array(cols)].map((_, i) => (
        <div key={i} className={styles.column}>
          {getBlocks(blockSize, nbOfBlocks)}
        </div>
      ))}
    </div>
  )
}
