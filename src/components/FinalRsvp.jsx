import { useState } from 'react'
import { couple } from '../data'
import RSVP from './RSVP'
import Section from './Section'

export default function FinalRsvp() {
  const [showRsvp, setShowRsvp] = useState(false)

  return (
    <>
      <Section className="final">
        <p>Kindly RSVP by December 15th to help us prepare the royal welcome for you.</p>
        <p className="gold">Kindly respond by December 15, 2026</p>
        <button className="btn" onClick={() => setShowRsvp(true)}>Joyfully Accept / RSVP Now</button>
        <p className="d">RSVP simply means — please let us know if you'll be able to join us.</p>
        <p className="gold">{couple.tag}</p>
      </Section>
      {showRsvp && <RSVP onClose={() => setShowRsvp(false)} />}
    </>
  )
}
