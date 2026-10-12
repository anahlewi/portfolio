import { useEffect, useState } from 'react'
import styles from './App.module.css'
import PixelBurst from './components/PixelBurst'

function ImageCycle({ images, interval = 5000 }) {
  const [index, setIndex] = useState(0)
  // Start paused for people who've asked for reduced motion.
  const [paused, setPaused] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, interval)
    return () => clearInterval(id)
  }, [images, interval, paused])

  const image = images[index]
  return (
    <>
      <img key={index} src={image.src} alt={image.alt} className={styles.experienceCycleImg} />
      <button
        type="button"
        className={styles.cycleToggle}
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? 'Play screenshot slideshow' : 'Pause screenshot slideshow'}
      >
        {paused ? '▶' : '❚❚'}
      </button>
    </>
  )
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

// TODO: replace summaries with full write-ups; add `url` to link a study out.
const CASE_STUDIES = [
  {
    title: 'Organizations Reporting',
    client: 'Square',
    summary: 'Designing and building reporting for Square organizations across iOS and web.',
    stack: 'iOS, Web, Prototyping',
    url: 'https://work-in-progress-blog.vercel.app/notes/case-study-square-organizations',
    color: '#f5c84c',
    shade: '#c99a1e',
  },
  {
    title: 'Wedding Site',
    client: 'Flaka Design Collective',
    year: '2025',
    summary: 'An interactive, fully functional custom wedding site built with brand designer Seka Seluga and UI/UX designer Anika Shields.',
    stack: 'React, Interaction design',
    url: 'https://work-in-progress-blog.vercel.app/notes/case-study-wedding-website',
    color: '#ffb37a',
    shade: '#d97b45',
  },
  {
    title: 'DNA Relatives Map',
    client: '23andMe',
    year: '2019',
    summary: 'Re-imagining the DNA Relatives map with MapboxGL to make exploring where your relatives live more interactive.',
    stack: 'MapboxGL, JavaScript',
    color: '#d6ecac',
    shade: '#9fbf6a',
  },
]

function FolderIcon({ open, color, shade }) {
  return (
    <svg
      className={styles.folderIcon}
      viewBox="0 0 16 14"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <path d="M0 1H7V2H16V14H0Z" fill="#000000" />
      <path d="M1 2H6V3H15V13H1Z" fill={open ? shade : color} />
      {open ? (
        <>
          <rect x="3" y="3" width="10" height="8" fill="#000000" />
          <rect x="4" y="4" width="8" height="7" fill="#ffffff" />
          <rect x="0" y="7" width="16" height="7" fill="#000000" />
          <rect x="1" y="8" width="14" height="5" fill={color} />
        </>
      ) : (
        <rect x="1" y="4" width="14" height="1" fill="#000000" />
      )}
    </svg>
  )
}

function CollapsibleSection({ id, title, className, children }) {
  const [open, setOpen] = useState(false)

  return (
    <section className={`${className} ${open ? '' : styles.sectionClosed}`} aria-labelledby={`${id}-heading`}>
      <h2 className={styles.featuredHeading} id={`${id}-heading`}>
        <button
          type="button"
          className={styles.sectionToggle}
          aria-expanded={open}
          aria-controls={`${id}-content`}
          onClick={() => setOpen((o) => !o)}
        >
          {title}
          <span className={styles.sectionToggleIcon} aria-hidden="true">
            {open ? '-' : '+'}
          </span>
        </button>
      </h2>
      <div id={`${id}-content`} className={styles.collapsible} inert={open ? undefined : ''}>
        <div className={styles.collapsibleInner}>{children}</div>
      </div>
    </section>
  )
}

function CaseStudies() {
  const [openIndex, setOpenIndex] = useState(null)
  const study = openIndex === null ? null : CASE_STUDIES[openIndex]

  return (
    <CollapsibleSection id="case-studies" title="Case Studies" className={styles.caseStudies}>
      <ul className={styles.folderGrid}>
        {CASE_STUDIES.map((s, i) => {
          const open = openIndex === i
          return (
            <li key={s.title}>
              <button
                type="button"
                className={styles.folder}
                aria-expanded={open}
                aria-controls="case-study-panel"
                onClick={() => setOpenIndex(open ? null : i)}
              >
                <FolderIcon open={open} color={s.color} shade={s.shade} />
                <span className={styles.folderLabel}>{s.title}</span>
              </button>
            </li>
          )
        })}
      </ul>

      {study && (
        <div id="case-study-panel" className={styles.casePanel} role="region" aria-label={study.title}>
          <p className={styles.caseClient}>
            {study.client}
            {study.year && ` · ${study.year}`}
          </p>
          <h3 className={styles.experienceName}>{study.title}</h3>
          <p className={styles.caseSummary}>{study.summary}</p>
          <p className={styles.caseStack}>{study.stack}</p>
          {study.url && (
            <a
              className={styles.caseLink}
              href={study.url}
              target="_blank"
              rel="noreferrer"
              style={{ '--accent': study.color }}
            >
              Read the case study <span aria-hidden="true">→</span>
              <span className={styles.srOnly}> (opens in a new tab)</span>
            </a>
          )}
        </div>
      )}
    </CollapsibleSection>
  )
}

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
    images: [
      {
        src: '/jade-seka-site1.png',
        alt: 'Wedding site entry screen: "Jade & Seka are getting married" in green and pink hand-lettering above a field asking for your name, email or phone number.',
      },
      {
        src: '/jade-seka-site2.png',
        alt: 'Wedding site home menu of hand-drawn illustrations: a bulletin board for Schedule, a carved mask for Travel, a disco ball for Things to Do, a gold rose for Registry, two smiling mouths for Our Story, and a gingerbread house for FAQs, above an RSVP button.',
      },
    ],
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
    <svg aria-hidden="true" viewBox="0 0 64 64" width="48" height="48" fill="none" stroke="#ffffff" strokeWidth="2">
      <rect x="6" y="10" width="52" height="44" rx="4" />
      <line x1="6" y1="22" x2="58" y2="22" />
      <circle cx="14" cy="16" r="1.6" fill="#ffffff" stroke="none" />
      <circle cx="20" cy="16" r="1.6" fill="#ffffff" stroke="none" />
    </svg>
  ),
  square: (
    <svg aria-hidden="true" viewBox="0 0 64 64" width="44" height="44" fill="none" stroke="#ffffff" strokeWidth="2">
      <rect x="10" y="10" width="44" height="44" rx="10" />
      <rect x="24" y="24" width="16" height="16" rx="4" fill="#ffffff" stroke="none" />
    </svg>
  ),
  dna: (
    <svg aria-hidden="true" viewBox="0 0 64 64" width="44" height="44" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round">
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
            <img
              src="/portrait.gif"
              alt="Animated line drawing of a figure dancing on a ringed planet."
              width="1200"
              height="1198"
              fetchpriority="high"
              className={styles.portraitImg}
            />
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

      <CaseStudies />

      <CollapsibleSection id="experience" title="Experience" className={styles.history}>
        <ul className={styles.historyList}>
          {HISTORY.map((role) => (
            <li
              key={role.name}
              className={styles.experienceRow}
            >
              <div className={styles.experienceText}>
                <h3 className={styles.experienceName}>{role.name}</h3>
                <p className={styles.experienceDescription}>{role.experience}</p>
                <p className={styles.experienceMeta}>{role.year}</p>
              </div>
              <div className={styles.experienceVisual} style={{ background: role.background }}>
                {role.images ? (
                  <ImageCycle images={role.images} />
                ) : role.logo ? (
                  <img src={role.logo} alt="" className={styles.experienceLogoImg} />
                ) : (
                  HISTORY_ICONS[role.icon]
                )}
              </div>
            </li>
          ))}
        </ul>
      </CollapsibleSection>

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
                aria-label={`Open ${project.title} (opens in a new tab)`}
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
                    <span className={styles.srOnly}> (opens in a new tab)</span>
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
