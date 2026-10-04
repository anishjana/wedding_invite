import { useState } from 'react'
import { families } from '../data'

export default function Invitation() {
  const [isOpen, setIsOpen] = useState(false)

  const openWithKeyboard = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsOpen(true)
    }
  }

  return (
    <section className="sec invite">
      <small>You Are Invited</small>
      <div
        className={`env ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onKeyDown={openWithKeyboard}
      >
        <div className="flap" />
        <div className="seal">AA</div>
        <div className="card">
          <h3>With Joy We Invite You</h3>
          <p className="quote">“With the blessings of the divine and the love of our families, we invite you to celebrate our union.”</p>
          {families.map(family => (
            <div key={family.title} className="fam">
              <h4>{family.title}</h4>
              <p>{family.host}</p>
              <p><small>Paternal Grandparents</small>{family.pg}</p>
              <p><small>Maternal Grandparents</small>{family.mg}</p>
            </div>
          ))}
        </div>
        {!isOpen && <span className="tap">Tap to open</span>}
      </div>
    </section>
  )
}
