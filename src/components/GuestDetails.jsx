import { useState } from 'react'
import { bank, couple, know } from '../data'
import Section, { SectionHeading } from './Section'

function HelpfulDetails({
  translate = (_key, fallback) => fallback,
}) {
  return (
    <Section>
      <SectionHeading
        eyebrow={translate("guest_details.eyebrow", "Helpful Details")}
        first={translate("guest_details.heading_first", "Things to")}
        second={translate("guest_details.heading_second", "Know")}
      />
      <div className="grid">
        {know.map(([title, detail], index) => (
          <article key={title} className="ev">
            <h3>{translate(`data.know.${index}.0`, title)}</h3>
            <p>{translate(`data.know.${index}.1`, detail)}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

function GiftDetails({
  revealDirection,
  translate = (_key, fallback) => fallback,
}) {
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
    <Section revealDirection={revealDirection}>
      <SectionHeading
        eyebrow={translate("guest_details.gifts_eyebrow", "Blessings & Gifts")}
        first={translate("guest_details.gifts_heading_first", "Shagun &")}
        second={translate("guest_details.gifts_heading_second", "Blessings")}
      />
      <p>
        {translate(
          "guest_details.gifts_message",
          "Your presence and blessings are our greatest gift. If you wish to honor us with a shagun, digital transfer details are below.",
        )}
      </p>
      <dl className="bank">
        {bank.map(([label, value], index) => (
          <div key={label} onClick={() => { void copyToClipboard(value) }}>
            <dt>{translate(`data.bank.${index}.0`, label)}</dt>
            <dd>
              {copied === value
                ? translate("guest_details.copied", "Copied ✓")
                : copyError
                  ? translate("guest_details.copy_failed", "Copy failed")
                  : value}
            </dd>
          </div>
        ))}
      </dl>
      <a className="btn" href="https://www.amazon.in/wedding/registry" target="_blank" rel="noreferrer">
        {translate("guest_details.wishlist", "Amazon Gift Wishlist")}
      </a>
    </Section>
  )
}

export default function GuestDetails({
  revealDirection = "right",
  translate = (_key, fallback) => fallback,
}) {
  return (
    <>
      {/* <HelpfulDetails translate={translate} /> */}
      <GiftDetails revealDirection={revealDirection} translate={translate} />
    </>
  )
}
