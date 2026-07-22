import styles from './style.module.css'

export default function NavMenu({ onOpen }) {
  const navItems = [
    { key: 'about',     label: 'about me' },
    { key: 'resume',    label: 'resume' },
    { key: 'contact',   label: 'contact' },
    { key: 'portfolio', label: 'portfolio' },
  ]

  return (
    <nav className={styles.nav}>
      <div className={styles.divider} />
      {navItems.map(({ key, label }) => (
        <button
          key={key}
          className={styles.link}
          onClick={() => onOpen(key)}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}
