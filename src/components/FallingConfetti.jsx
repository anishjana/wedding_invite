import { useEffect, useRef } from 'react'

/**
 * FallingConfetti
 * Loads canvas-confetti on mount and drops gentle stars, hearts and leaves
 * from the top of the page, continuously, across the full width.
 *
 * Install:  npm i canvas-confetti
 * Usage:    <FallingConfetti />   (render once, e.g. at the top of <App />)
 *
 * Props
 *  - rate:     ms between each drop (lower = denser). Default 220
 *  - duration: ms to keep falling; null = forever. Default null
 *  - zIndex:   canvas stacking order. Default 5 (pointer-events are off, so clicks pass through)
 */

// SVG paths (same heart path used in the canvas-confetti docs, plus a simple leaf)
const HEART = 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z'
const LEAF = 'M0 100C0 40 40 0 100 0C100 60 60 100 0 100Z M0 100L70 30'

const rand = (min, max) => Math.random() * (max - min) + min

export default function FallingConfetti({ rate = 350, duration = null, zIndex = 5 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    let timer, stopTimer, fire, cancelled = false

    // Load the library only after the page has mounted
    import('canvas-confetti').then(({ default: confetti }) => {
      if (cancelled) return

      // Own canvas so we control size, z-index and resizing
      fire = confetti.create(canvasRef.current, { resize: true, useWorker: true })

      const shapes = {
        star: { shapes: ['star'], colors: ['#f6d77a', '#e6c987', '#fff3c4'], scalar: 1.4 },
        heart: {
          shapes: [confetti.shapeFromPath({ path: HEART })],
          colors: ['#e85d75', '#f4a6b7', '#ff8fa3', '#c9184a'],
          scalar: 1.6,
        },
        leaf: {
          shapes: [confetti.shapeFromPath({ path: LEAF })],
          colors: ['#7fb069', '#a3c585', '#5c8a4d', '#c7a74a'],
          scalar: 1.8,
        },
      }
      const kinds = Object.keys(shapes)

      const drop = () => {
        const kind = shapes[kinds[Math.floor(Math.random() * kinds.length)]]
        fire({
          ...kind,
          particleCount: 1,
          origin: { x: Math.random(), y: -0.05 },   // anywhere across the top edge
          angle: 90,                                // straight down
          spread: 40,
          startVelocity: 0.5,                // slow start
          gravity: rand(0.25, 0.5),                 // gentle fall
          drift: rand(-0.8, 0.8),                   // sway sideways
          decay: 0.96,
          ticks: 900,                               // live long enough to cross the page
          flat: false,
          disableForReducedMotion: true,
        })
      }

      // Initial scatter so the page doesn't start empty
      for (let i = 0; i < 12; i++) setTimeout(drop, i * 120)
      timer = setInterval(drop, rate)
      if (duration) stopTimer = setTimeout(() => clearInterval(timer), duration)
    })

    return () => {
      cancelled = true
      clearInterval(timer)
      clearTimeout(stopTimer)
      fire?.reset()
    }
  }, [rate, duration])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex,
      }}
    />
  )
}
