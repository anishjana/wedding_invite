import { useState } from 'react'
import { bank, couple, know } from '../data'
import Section, { SectionHeading } from './Section'

function HelpfulDetails() {
  return (
    <Section>
      <SectionHeading eyebrow="Helpful Details" first="Things to" second="Know" />
      <div className="grid">
        {know.map(([title, detail]) => (
          <article key={title} className="ev">
            <h3>{title}</h3>
            <p>{detail}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

function GiftDetails() {
  const [copied, setCopied] = useState('')
  const [copyError, setCopyError] = useState(false)

  const copyToClipboard = async value => {
    try {
      if (!navigator.clipboard) {
        throw new Error('Clipboard access is not available in this browser.')
      }
      await navigator.clipboard.writeText(value)
      setCopied(value)
      setCopyError(false)
      window.setTimeout(() => setCopied(''), 1500)
    } catch (error) {
      console.error('Unable to copy gift detail to clipboard.', error)
      setCopyError(true)
    }
  }

  return (
    <Section>
      <SectionHeading eyebrow="Blessings & Gifts" first="Shagun &" second="Blessings" />
      <p>Your presence and blessings are our greatest gift. If you wish to honor us with a shagun, digital transfer details are below.</p>
      <dl className="bank">
        {bank.map(([label, value]) => (
          <div key={label} onClick={() => { void copyToClipboard(value) }}>
            <dt>{label}</dt>
            <dd>{copied === value ? 'Copied ✓' : copyError ? 'Copy failed' : value}</dd>
          </div>
        ))}
      </dl>
      <a className="btn" href="https://www.amazon.in/wedding/registry" target="_blank" rel="noreferrer">Amazon Gift Wishlist</a>
    </Section>
  )
}

export default function GuestDetails() {
  return (
    <>
      {/* <HelpfulDetails /> */}
      <GiftDetails />
    </>
  )
}
