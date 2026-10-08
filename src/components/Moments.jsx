import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { gallery } from '../data'
import Section, { SectionHeading } from './Section'

function GalleryMoment({ moment, index }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [48, 0, -28])
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [index % 2 ? 5 : -5, 0, index % 2 ? -3 : 3],
  )
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.94])
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.82],
  )

  return (
    <motion.figure
      ref={ref}
      style={
        reduceMotion
          ? { opacity: 1, y: 0, rotate: 0, scale: 1 }
          : { opacity, y, rotate, scale }
      }
    >
      <img src={moment.src} alt={`Moment ${index + 1}`} loading="lazy" />
      <figcaption>{moment.label}</figcaption>
    </motion.figure>
  )
}

export default function Moments() {
  return (
    <Section>
      <SectionHeading eyebrow="Our Moments" first="The" second="Gallery" />
      <div className="gal gallery-grid">
        {gallery.map((moment, index) => (
          <GalleryMoment key={moment.src} moment={moment} index={index} />
        ))}
      </div>
    </Section>
  )
}
