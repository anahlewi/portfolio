import styles from './Hamburger.module.css'

export default function Hamburger({ onOpen }) {
  return (
    <div className={styles.wrap}>
      <button
        className={styles.hamburger}
        onClick={() => onOpen('about')}
        aria-label="Open about me"
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>
    </div>
  )
}
