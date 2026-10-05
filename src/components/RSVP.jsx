import { useState } from 'react'

export default function RSVP({ onClose }) {
  const [form, setForm] = useState({ name: '', guests: 1, attend: 'yes', note: '' })
  const [isSent, setIsSent] = useState(false)

  const updateField = field => event => {
    setForm(current => ({ ...current, [field]: event.target.value }))
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="panel" onClick={event => event.stopPropagation()}>
        {isSent ? (
          <>
            <h3>Thank you, {form.name}!</h3>
            <p>Your response has been noted.</p>
            <button onClick={onClose}>Close</button>
          </>
        ) : (
          <div className="form">
            <h3>RSVP</h3>
            <input placeholder="Your name" value={form.name} onChange={updateField('name')} />
            <select value={form.attend} onChange={updateField('attend')}>
              <option value="yes">Joyfully Accept</option>
              <option value="no">Regretfully Decline</option>
            </select>
            <input type="number" min="1" max="10" value={form.guests} onChange={updateField('guests')} />
            <textarea placeholder="A message for the couple" value={form.note} onChange={updateField('note')} />
            <button className="btn" disabled={!form.name} onClick={() => { console.log('RSVP', form); setIsSent(true) }}>Send</button>
          </div>
        )}
      </div>
    </div>
  )
}
