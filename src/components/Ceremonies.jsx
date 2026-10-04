import { events } from '../data'
import Section, { SectionHeading } from './Section'

const calendarUrl = event => `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&dates=${event.start}/${event.end}&location=${encodeURIComponent(event.at)}&details=${encodeURIComponent(event.desc)}`
const mapUrl = event => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.at)}`

export default function Ceremonies() {
  return (
    <Section>
      <SectionHeading eyebrow="The Sacred Rites" first="The" second="Ceremonies" />
      <div className="grid">
        {events.map(event => (
          <article key={event.name} className="ev">
            <span className="ic">{event.icon}</span>
            <h3>{event.name}</h3>
            <p className="gold">{event.when}</p>
            <p>{event.at}</p>
            <p><small>Dress: </small>{event.dress}</p>
            <p className="d">{event.desc}</p>
            <div className="row">
              <a href={mapUrl(event)} target="_blank" rel="noreferrer">Map</a>
              <a href={calendarUrl(event)} target="_blank" rel="noreferrer">Google Calendar</a>
            </div>
          </article>
        ))}
      </div>
      <div className="plan">
        <h3>Plan Your Visit</h3>
        <p>Schedule a meeting with the couple or wedding planners directly on Calendly.</p>
        <a className="btn" href="https://calendly.com/shaadiora-demo" target="_blank" rel="noreferrer">Calendly</a>
      </div>
    </Section>
  )
}
