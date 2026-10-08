import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { DATE, DATE_LABEL, couple } from '../data'
import { useRevealOnScroll } from './Section'

function useCountdown() {
  const calculate = () => {
    const remaining = Math.max(0, DATE - Date.now())
    return [
      remaining / 864e5,
      (remaining / 36e5) % 24,
      (remaining / 6e4) % 60,
      (remaining / 1e3) % 60,
    ].map(value => String(Math.floor(value)).padStart(2, '0'))
  }
  const [countdown, setCountdown] = useState(calculate)

  useEffect(() => {
    const timer = setInterval(() => setCountdown(calculate()), 1000)
    return () => clearInterval(timer)
  }, [])

  return countdown
}

export default function Hero() {
  const countdown = useCountdown()
  const revealProps = useRevealOnScroll()

  return (
    <motion.section {...revealProps} className="hero">
      <h1>{couple.a}</h1>
      <span className="amp">&</span>
      <h1>{couple.b}</h1>
      <p>Are getting married</p>
      <p className="gold">{DATE_LABEL} • {couple.venue}</p>
      <div className="count">
        {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, index) => (
          <div key={label}><b>{countdown[index]}</b><span>{label}</span></div>
        ))}
      </div>
      <div className="scroll">Scroll to begin</div>
    </motion.section>
  )
}
