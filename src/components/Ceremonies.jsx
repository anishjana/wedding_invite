import { motion, useReducedMotion } from 'framer-motion'
import { events } from '../data'
import Section, { SectionHeading } from './Section'

const calendarUrl = event => `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&dates=${event.start}/${event.end}&location=${encodeURIComponent(event.at)}&details=${encodeURIComponent(event.desc)}`
const mapUrl = event => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.at)}`
const VIDEO_BACKGROUNDS = {
  "Sangeet & Engagement": "sangeet.mp4",
  "Haldi Ceremony": "haldi.mp4",
  "Shubh Vivah": "shubh vivaah.mp4",
  Reception: "reception.mp4",
}

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.14,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 36, rotateX: 10, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Ceremonies({ revealDirection = "right" }) {
  const reduceMotion = useReducedMotion()

  return (
    <Section revealDirection={revealDirection}>
      <SectionHeading eyebrow="The Sacred Rites" first="The" second="Ceremonies" />
      <motion.div
        className="grid ceremony-grid"
        variants={gridVariants}
        initial={reduceMotion ? false : 'hidden'}
        whileInView={reduceMotion ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.15 }}
      >
        {events.map(event => (
          <motion.article
            key={event.name}
            className={`ev${VIDEO_BACKGROUNDS[event.name] ? " ev-video" : ""}`}
            variants={cardVariants}
            whileHover={reduceMotion ? undefined : { y: -6, scale: 1.025 }}
            transition={{ duration: 0.25 }}
          >
            {VIDEO_BACKGROUNDS[event.name] && (
              <>
                <video
                  className="ev-background-video"
                  src={`${import.meta.env.BASE_URL}video-bg/${VIDEO_BACKGROUNDS[event.name]}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                />
                <div className="ev-background-overlay" aria-hidden="true" />
              </>
            )}
            <span className="ic">
              {event.iconImage ? <img src={event.iconImage} alt="" /> : event.icon}
            </span>
            <h3>{event.name}</h3>
            <p className="gold">{event.when}</p>
            <p>{event.at}</p>
            {/* <p><small>Dress: </small>{event.dress}</p> */}
            <p className="d">{event.desc}</p>
            <div className="row">
              <a href={mapUrl(event)} target="_blank" rel="noreferrer">Map</a>
              <a href={calendarUrl(event)} target="_blank" rel="noreferrer">Google Calendar</a>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}
