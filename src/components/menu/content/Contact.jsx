import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './contact.module.css'

const slideIn = (i) => ({
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1], delay: 0.8 + i * 0.12 },
  },
})

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const CONTACT_EMAIL = 'anahlewi@gmail.com'

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = `Portfolio contact from ${form.name || 'someone'}`
    const body = `${form.message}\n\n— ${form.name} (${form.email})`
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const fields = [
    { key: 'name',  label: 'name',  type: 'text',  placeholder: 'your name' },
    { key: 'email', label: 'email', type: 'email', placeholder: 'your@email.com' },
  ]

  return (
    <div className={styles.wrapper}>

      <motion.div variants={slideIn(0)} initial="hidden" animate="visible" className={styles.links}>
        <p>email — <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        <p>linkedin — <a href="https://www.linkedin.com/in/anahlewi/" target="_blank" rel="noopener noreferrer">linkedin.com/in/anahlewi</a></p>
        <p>github — <a href="https://github.com/anahlewi" target="_blank" rel="noopener noreferrer">github.com/anahlewi</a></p>
      </motion.div>

      {sent ? (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.confirm}>
          opening your email client —<br />send it over and i'll be in touch.
        </motion.p>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          {fields.map(({ key, label, type, placeholder }, i) => (
            <motion.div key={key} variants={slideIn(i + 1)} initial="hidden" animate="visible" className={styles.fieldGroup}>
              <label className={styles.label}>{label}</label>
              <input
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                className={styles.input}
              />
            </motion.div>
          ))}

          <motion.div variants={slideIn(3)} initial="hidden" animate="visible" className={styles.fieldGroup}>
            <label className={styles.label}>message</label>
            <textarea
              rows={4}
              placeholder="what's on your mind"
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              className={styles.textarea}
            />
          </motion.div>

          <motion.button
            variants={slideIn(4)} initial="hidden" animate="visible"
            type="submit"
            className={styles.submit}
            whileHover={{ background: 'rgba(255,255,255,0.12)' }}
          >
            [ send ]
          </motion.button>
        </form>
      )}
    </div>
  )
}
