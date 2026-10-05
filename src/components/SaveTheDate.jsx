import { useEffect, useRef, useState } from 'react'
import { DATE_LABEL } from '../data'
import Section, { SectionHeading } from './Section'

function ScratchCard() {
  const canvasRef = useRef(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const dpr = window.devicePixelRatio || 1
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    canvas.width = 250 * dpr
    canvas.height = 112 * dpr

    const gradient = context.createLinearGradient(0, 0, 320, 140)
    gradient.addColorStop(0, '#b8924a')
    gradient.addColorStop(1, '#e6c987')
    context.fillStyle = gradient
    context.fillRect(0, 0, 320, 140)
    context.fillStyle = '#0b0809'
    context.font = '22px serif'
    context.textAlign = 'center'
    context.fillText('Mark Your Calendar', 160, 65)
    context.font = '14px serif'
    context.letterSpacing = "1.2px"
    context.fillText('✦ Scratch with your finger or mouse ✦', 160, 100)

    let isScratching = false
    const getPosition = event => {
      const bounds = canvas.getBoundingClientRect()
      const pointer = event.touches ? event.touches[0] : event
      return [
        (pointer.clientX - bounds.left) * 320 / bounds.width,
        (pointer.clientY - bounds.top) * 140 / bounds.height,
      ]
    }
    const scratch = event => {
      if (!isScratching) return
      event.preventDefault()
      const [x, y] = getPosition(event)
      context.globalCompositeOperation = 'destination-out'
      context.beginPath()
      context.arc(x, y, 18, 0, 7)
      context.fill()

      const pixels = context.getImageData(0, 0, 320, 140).data
      let clearedPixels = 0
      for (let index = 3; index < pixels.length; index += 160) {
        if (!pixels[index]) clearedPixels += 1
      }
      if (clearedPixels / (pixels.length / 160) > 0.5) setIsRevealed(true)
    }
    const startScratching = event => {
      isScratching = true
      scratch(event)
    }
    const stopScratching = () => { isScratching = false }

    canvas.addEventListener('mousedown', startScratching)
    canvas.addEventListener('touchstart', startScratching, { passive: false })
    canvas.addEventListener('mousemove', scratch)
    canvas.addEventListener('touchmove', scratch, { passive: false })
    window.addEventListener('mouseup', stopScratching)
    window.addEventListener('touchend', stopScratching)

    return () => {
      canvas.removeEventListener('mousedown', startScratching)
      canvas.removeEventListener('touchstart', startScratching)
      canvas.removeEventListener('mousemove', scratch)
      canvas.removeEventListener('touchmove', scratch)
      window.removeEventListener('mouseup', stopScratching)
      window.removeEventListener('touchend', stopScratching)
    }
  }, [])

  return (
    <>
      <div className="scratch">
        <div className="date">{DATE_LABEL}</div>
        <canvas ref={canvasRef} className={isRevealed ? 'gone' : ''} />
      </div>
    </>
  )
}

export default function SaveTheDate() {
  return (
    <Section>
      <SectionHeading eyebrow="Save The Date" first="Reveal our" second="Special Day" />
      <ScratchCard />
    </Section>
  )
}
