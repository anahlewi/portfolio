import { motion } from 'framer-motion'
import styles from './resume.module.css'
import Typewriter from '../../Typewriter'

const slideIn = {
  hidden: { opacity: 0, x: -40 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1], delay: 1.6 + i * 0.15 },
  }),
}

const experience = [
  {
    title: 'Contract Software Engineer · PruTech Technologies',
    location: 'Remote',
    period: 'Apr 2026 – Present',
    bullets: [
      'Architecting a design agent in TypeScript using constitution-file–based configuration to automate component generation from a live design system.',
      'Built a Storybook scraping pipeline with Puppeteer to extract component data at scale, feeding a microfrontend architecture.',
      'Designed reusable agent primitives and a structured agent.md reference system to make AI-assisted workflows consistent and extensible.',
    ],
  },
  {
    title: 'Freelance Frontend Developer · Flaka Design Collective',
    location: 'Brooklyn, NY',
    period: 'Apr 2025 – Sep 2025',
    bullets: [
      'Led end-to-end frontend development of a custom, design-forward wedding website.',
      'Owned implementation, QA, and cross-device testing; managed deployment and post-launch iterations.',
    ],
  },
  {
    title: 'Frontend Software Engineer L4 → Product Partner · Square, Inc',
    location: 'New York, NY',
    period: 'Mar 2022 – Mar 2025',
    bullets: [
      'Owned full design-to-implementation lifecycle on Multi-Seller platform in React, TypeScript, Ember.js, and GraphQL.',
      'Designed and built an onboarding refinement surface for Square\'s Food & Beverage vertical, improving merchant categorization for 100k+ sellers.',
      'Acted as product partner on high-visibility cross-functional projects, eliminating the design–dev handoff gap.',
    ],
  },
  {
    title: 'Software Engineer L3 · Square, Inc',
    location: 'Atlanta, GA',
    period: 'Feb 2020 – Mar 2022',
    bullets: [
      'Maintained and extended Seller Profile services powering 210M+ sellers; contributed to Google My Business integration.',
      'Expanded platform internationally, launching services in Ireland, France, and Spain.',
      'Participated in on-call rotation using Splunk, PagerDuty, Datadog, and Sentry.',
    ],
  },
  {
    title: 'iOS Engineer (6-month rotation) · Square, Inc',
    location: 'Atlanta, GA',
    period: 'Jul 2020 – Dec 2020',
    bullets: [
      'Designed and shipped a language-preference feature for Square\'s Business Information Settings for 33M+ app users (Swift, Objective-C).',
      'Migrated legacy Objective-C code to Swift and Square\'s internal Workflow framework.',
    ],
  },
  {
    title: 'Frontend Engineer Intern · 23andMe',
    location: 'Mountain View, CA',
    period: 'May 2019 – Aug 2019',
    bullets: [
      'Redesigned the DNA Relatives interactive map (MapboxGL, React, Django, Sass) — improvements shipped to 12M+ users.',
    ],
  },
]

const skills = {
  Design: 'Information hierarchy · typography · interaction design · design systems · component libraries · information pacing · layout',
  Code: 'HTML · CSS · JavaScript · TypeScript · React · Ember.js · GraphQL · Python · Swift · SQL · Sass · Puppeteer · Storybook',
  'AI / Agents': 'Designing and building AI-assisted workflows · agent configuration · constitution-file patterns · prompt engineering',
  Workflow: 'Browser-first iteration · cross-functional collaboration · user testing · full product lifecycle · microfrontend architecture',
}

export default function Resume() {
  return (
    <div className={styles.wrapper}>

      <section>
        <h3 className={styles.subheading}><Typewriter text="experience" speed={60} delay={800} /></h3>
        <motion.div custom={0} variants={slideIn} initial="hidden" animate="visible" className={styles.timeline}>
          {experience.map((item, i) => (
            <div key={i} className={styles.timelineItem}>
              <div className={styles.timelineHeader}>
                <p>{item.title}</p>
                <p className={styles.period}>{item.period}</p>
              </div>
              <p className={styles.location}>{item.location}</p>
              <ul className={styles.bullets}>
                {item.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </motion.div>
      </section>

      <section>
        <h3 className={styles.subheading}><Typewriter text="skills" speed={30} delay={800} /></h3>
        <motion.div custom={1} variants={slideIn} initial="hidden" animate="visible" className={styles.skillsGrid}>
          {Object.entries(skills).map(([cat, val]) => (
            <div key={cat} className={styles.skillRow}>
              <span className={styles.skillCat}>{cat}</span>
              <span className={styles.skillVal}>{val}</span>
            </div>
          ))}
        </motion.div>
      </section>

      <section>
        <h3 className={styles.subheading}><Typewriter text="education" speed={30} delay={800} /></h3>
        <motion.div custom={2} variants={slideIn} initial="hidden" animate="visible" className={styles.educationBlock}>
          <p>Wellesley College — BA Computer Science · Minor: Latina/o Studies</p>
          <p className={styles.period}>Code2040 Fellow · Girls Who Code Alumnae · NCWIT Awards</p>
        </motion.div>
      </section>

    </div>
  )
}
