import { useEffect, useRef, useState } from 'react'

export default function Curtains({ onOpen }) {
  const [dragY, setDragY] = useState(0)
  const [pullProgress, setPullProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isReturning, setIsReturning] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const dragRef = useRef(null)
  const openedRef = useRef(false)
  const returnTimerRef = useRef(null)

  useEffect(() => () => window.clearTimeout(returnTimerRef.current), [])

  const openCurtains = () => {
    if (openedRef.current) return

    openedRef.current = true
    setPullProgress(1)
    setIsOpened(true)
    onOpen?.()
  }

  useEffect(() => {
    if (!isOpened) return undefined

    const timer = window.setTimeout(() => setIsVisible(false), 1800)
    return () => window.clearTimeout(timer)
  }, [isOpened])

  const startPull = event => {
    if (openedRef.current) return

    window.clearTimeout(returnTimerRef.current)
    setIsReturning(false)
    const bounds = event.currentTarget.getBoundingClientRect()
    dragRef.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      maxPull: Math.max(0, window.innerHeight - bounds.bottom),
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    // setPullProgress(0.02)
    setIsDragging(true)
  }

  const continuePull = event => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    const nextDragY = Math.min(drag.maxPull, Math.max(0, event.clientY - drag.startY))
    const nextProgress = drag.maxPull === 0 ? 1 : nextDragY / drag.maxPull
    setDragY(nextDragY)
    setPullProgress(nextProgress)

    if (nextProgress >= 1) {
      dragRef.current = null
      setIsDragging(false)
      openCurtains()
    }
  }

  const finishPull = event => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    dragRef.current = null
    setIsDragging(false)
    setDragY(0)
    setPullProgress(0)
    setIsReturning(dragY > 0)
    if (dragY > 0) {
      returnTimerRef.current = window.setTimeout(() => setIsReturning(false), 1800)
    }
  }

  if (!isVisible) return null

  const progress = isOpened ? 1 : pullProgress

  return (
    <div className={`curtain-scene ${isOpened ? 'curtain-opened' : ''} ${isDragging ? 'is-dragging' : ''} ${isReturning ? 'is-returning' : ''}`}>
      <div
        className="curtain-left"
        style={{ transform: `translateX(${-progress * 100}%) scaleX(${1 - progress * 0.7})` }}
      ></div>
      <div
        className="curtain-right"
        style={{ transform: `translateX(${progress * 100}%) scaleX(${1 - progress * 0.7})` }}
      ></div>
      <div
        className="curtain-valance"
        style={{ transform: `translateY(${-progress * 100}%)` }}
      ></div>
      <div
        className="curtain-rope"
        draggable="false"
        style={{
          transform: `translate(-50%, ${dragY}px)`,
          userSelect: 'none',
          touchAction: 'pan-x',
        }}
      >
        <div
          className={`rope-tassel ${isDragging ? 'is-dragging' : ''}`}
          onPointerDown={startPull}
          onPointerMove={continuePull}
          onPointerUp={finishPull}
          onPointerCancel={finishPull}
          style={{ touchAction: 'none' }}
        >
          <span className="rope-ring"></span>
          <div className="rope-line" style={{ height: '50px' }}></div>
          <div className="rope-cap"></div>
          <div className="rope-head"></div>
          <div className="rope-fringe">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div className="curtain-pull-hint" style={{ opacity: 1 }}>
        <button className="hint-badge" aria-label="Open invitation" onClick={openCurtains}>
          <span className="hint-star">✦</span>
          <span className="hint-text">Pull to Open</span>
          <span className="hint-star">✦</span>
        </button>
      </div>
    </div>
  );
}
