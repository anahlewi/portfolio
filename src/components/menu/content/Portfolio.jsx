import styles from './portfolio.module.css'

const projects = [
  {
    num: '01',
    title: 'Mosaic Portrait',
    tag: 'p5.js · generative art',
    url: 'https://editor.p5js.org/anahlewi/sketches/iODvPEM0j',
    desc: 'Generative portrait built from mosaic tiles using pixel sampling and color mapping.',
  },
  {
    num: '02',
    title: 'Color Grid',
    tag: 'p5.js · generative art',
    url: 'https://editor.p5js.org/anahlewi/sketches/aftCPJkJI',
    desc: 'Procedurally generated color grid exploring rhythm, repetition, and palette.',
  },
  {
    num: '03',
    title: 'Audio Visualizer',
    tag: 'p5.js · creative code',
    url: 'https://editor.p5js.org/anahlewi/sketches/NQjHJ4xQD',
    desc: 'Real-time audio visualization using FFT analysis and p5.sound.',
  },
  {
    num: '04',
    title: '10 Print',
    tag: 'p5.js · generative art',
    url: 'https://editor.p5js.org/anahlewi/sketches/-UWdZ-lIF',
    desc: 'Variation on the classic 10 PRINT BASIC maze algorithm.',
  },
  {
    num: '05',
    title: 'Personal Website Terminal',
    tag: 'React · TypeScript',
    url: 'https://anahlewi.github.io/personal-website-term/',
    desc: 'Interactive portfolio as a browser-based terminal with custom commands and keyboard navigation. 2,000+ unique visitors.',
  },
  {
    num: '06',
    title: 'Digital Molas',
    tag: 'creative code · web',
    url: 'https://anahlewi.github.io/digital-molas/',
    desc: 'Digital interpretation of Kuna mola textile patterns using generative techniques.',
  },
]

export default function Portfolio() {
  return (
    <div className={styles.grid}>
      {projects.map(({ num, title, tag, url, desc }) => (
        <a
          key={num}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.card}
        >
          <div className={styles.thumbnail}>[ project image ]</div>
          <span className={styles.num}>{num}</span>
          <p className={styles.projectTitle}>{title}</p>
          <p className={styles.projectDesc}>{desc}</p>
          <p className={styles.projectTags}>{tag}</p>
        </a>
      ))}
    </div>
  )
}
