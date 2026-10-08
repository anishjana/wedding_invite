import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

export function useRevealOnScroll() {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.14, 0.84, 1],
    [0, 1, 1, 0.9],
  )
  const y = useTransform(
    scrollYProgress,
    [0, 0.14, 0.84, 1],
    [52, 0, -18, -32],
  )
  const scale = useTransform(scrollYProgress, [0, 0.14, 1], [0.97, 1, 1])

  return {
    ref,
    style: reduceMotion
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity, y, scale },
  }
}

export default function Section({ children, className = '' }) {
  const revealProps = useRevealOnScroll()
  return (
    <motion.section {...revealProps} className={`sec ${className}`}>
      {children}
    </motion.section>
  )
}

export function SectionHeading({ eyebrow, first, second }) {
  return (
    <header className="head">
      <small>{eyebrow}</small>
      <h2>{first} <em>{second}</em></h2>
    </header>
  )
}
