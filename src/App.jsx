import { useEffect, useState } from 'react'
import styles from './App.module.css'
import PixelBurst from './components/PixelBurst'

function ImageCycle({ images, alt, interval = 5000 }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, interval)
    return () => clearInterval(id)
  }, [images, interval])

  return <img key={index} src={images[index]} alt={alt} className={styles.experienceCycleImg} />
}

const PROJECTS = [
  {
    title: 'Desktop Project',
    stack: 'React, React95',
    tag: 'React95',
    url: 'https://www.flaka.design/',
    background: 'linear-gradient(135deg, #009999, #007a7a)',
    numberColor: '#ffffff',
  },
  {
    title: 'Affirmations Webcam',
    stack: 'p5.js, ml5.js',
    tag: 'p5.js',
    url: 'https://anahlewi.github.io/affirmations-webcam/',
    background: 'linear-gradient(135deg, #ffb37a, #ff8a5c)',
    numberColor: '#ffffff',
  },
  {
    title: 'Anahesty Terminal',
    stack: 'React, Advice API, Bad Advice API',
    tag: 'terminal',
    url: 'https://anahlewi.github.io/anahesty-terminal/',
    background: 'linear-gradient(135deg, #14170f, #2a2f20)',
    numberColor: '#8fae5a',
  },
  {
    title: 'Notes App Blog',
    stack: 'Supabase, React, TypeScript, FastAPI, Vercel',
    tag: 'Supabase, Vercel',
    url: 'https://work-in-progress-blog.vercel.app/',
    background: 'linear-gradient(135deg, #f3ecd2, #e6dbab)',
    numberColor: '#14170f',
  },
]

const HISTORY = [
  {
    name: 'PruTech Technologies',
    experience: 'Contract Design engineer responsible for modernizing government agency portal',
    year: '2026',
    background: '#eae7e7',
    logo: '/prutech-logo.svg',
  },
  {
    name: 'Flaka Design Collective',
    experience: 'Built an interactive fully functional custom wedding w/ the help of Brand Designer Seka Seluga and UI/UX expert Anika Shields',
    year: 'March 2025 - Present',
    images: ['/jade-seka-site1.png', '/jade-seka-site2.png'],
  },
  {
    name: 'Square',
    experience: 'Built, designed, and protoyped user interfaces for iOS and web applications',
    year: 'July 2020- March 2025',
    background: '#14170f',
    logo: '/square-logo.png',
  },
  {
    name: '23andMe',
    experience: 'Re-imagined the DNA relatives map increased interactivity using the MapBoxGL library',
    year: 'May 2019 - August 2019',
    background: '#eae7e7',
    logo: '/23andme-logo.svg',
  },
]

const HISTORY_ICONS = {
  window: (
    <svg viewBox="0 0 64 64" width="48" height="48" fill="none" stroke="#ffffff" strokeWidth="2">
      <rect x="6" y="10" width="52" height="44" rx="4" />
      <line x1="6" y1="22" x2="58" y2="22" />
      <circle cx="14" cy="16" r="1.6" fill="#ffffff" stroke="none" />
      <circle cx="20" cy="16" r="1.6" fill="#ffffff" stroke="none" />
    </svg>
  ),
  square: (
    <svg viewBox="0 0 64 64" width="44" height="44" fill="none" stroke="#ffffff" strokeWidth="2">
      <rect x="10" y="10" width="44" height="44" rx="10" />
      <rect x="24" y="24" width="16" height="16" rx="4" fill="#ffffff" stroke="none" />
    </svg>
  ),
  dna: (
    <svg viewBox="0 0 64 64" width="44" height="44" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round">
      <path d="M20 6 C36 16, 28 24, 44 34 C28 44, 36 52, 20 58" />
      <path d="M44 6 C28 16, 36 24, 20 34 C36 44, 28 52, 44 58" />
      <line x1="24" y1="14" x2="40" y2="14" />
      <line x1="22" y1="24" x2="42" y2="24" />
      <line x1="22" y1="40" x2="42" y2="40" />
      <line x1="24" y1="50" x2="40" y2="50" />
    </svg>
  ),
}

export default function App() {
  return (
    <div className={styles.root}>
      <PixelBurst />
      <section className={styles.hero}>
        <div className={styles.topRow}>
          <h1 className={styles.name}>ANAH LEWI</h1>
        </div>

        <div className={styles.introRow}>
          <div className={styles.portrait}>
            <img src="https://tyajqainwjvxmehbptzh.supabase.co/storage/v1/object/public/media/IMG_1724.gif" className={styles.portraitImg} />
            {/* <svg className={styles.portraitPlaceholder} viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
              <path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg> */}
          </div>

          <div className={styles.introText}>
            <h2 className={styles.introHeading}>Introduction</h2>
            <p className={styles.introParagraph}>
              Hi, my name is Anah. I am a multidisciplinary Creative Technologist and
              Software engineer with over 5 years of experience. I specialize in digital
              archiving and building functional and creative user experiences.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.history}>
        <h2 className={styles.featuredHeading}>EXPERIENCE</h2>
        <ul className={styles.historyList}>
          {HISTORY.map((role, i) => (
            <li
              key={role.name}
              className={`${styles.experienceRow} ${i % 2 === 1 ? styles.experienceRowReverse : ''}`}
            >
              <div className={styles.experienceText}>
                <h3 className={styles.experienceName}>{role.name}</h3>
                <p className={styles.experienceDescription}>{role.experience}</p>
                <p className={styles.experienceMeta}>{role.year}</p>
              </div>
              <div className={styles.experienceVisual} style={{ background: role.background }}>
                {role.images ? (
                  <ImageCycle images={role.images} alt={role.name} />
                ) : role.logo ? (
                  <img src={role.logo} alt={role.name} className={styles.experienceLogoImg} />
                ) : (
                  HISTORY_ICONS[role.icon]
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.portfolio}>
        <div className={styles.portfolioGrid}>
          <div className={styles.blocks}>
            {PROJECTS.map((project, i) => (
              <a
                key={project.url}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className={styles.block}
                data-block={i + 1}
                style={{ background: project.background }}
                aria-label={`Open ${project.title}`}
                title={project.title}
              >
                <span className={styles.blockNumber} style={{ color: project.numberColor }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </a>
            ))}
          </div>

          <div className={styles.portfolioInfo}>
            <h2 className={styles.featuredHeading}>Featured Work</h2>
            <ol className={styles.featuredList}>
              {PROJECTS.map((project, i) => (
                <li key={project.url} className={styles.featuredRow}>
                  <span className={styles.featuredIndex}>{String(i + 1).padStart(2, '0')}</span>
                  <a
                    className={styles.featuredLink}
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.title}
                  </a>
                  <span className={styles.featuredTag}>, {project.tag}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className={styles.contact}>
        <h2 className={styles.contactHeading}>GET IN TOUCH</h2>
        <a href="mailto:anahlewi@gmail.com" className={styles.contactEmail}>
          anahlewi@gmail.com
        </a>
      </section>
    </div>
  )
}
