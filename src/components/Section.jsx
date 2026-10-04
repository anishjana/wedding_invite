import { useEffect, useRef, useState } from 'react'

export default function Section({ children, className = '' }) {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.15 })

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className={`sec reveal ${visible ? 'in' : ''} ${className}`}>
      {children}
    </section>
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
