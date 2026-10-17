import { wishes } from '../data'
import Section, { SectionHeading } from './Section'

export default function Wishes({
  translate = (_key, fallback) => fallback,
}) {
  return (
    <Section>
      <SectionHeading
        eyebrow={translate("wishes.eyebrow", "Shower of Blessings")}
        first={translate("wishes.heading_first", "Greetings &")}
        second={translate("wishes.heading_second", "Love")}
      />
      {wishes.map(([message, sender], index) => (
        <blockquote key={sender}>
          “{translate(`data.wishes.${index}.0`, message)}”
          <cite>— {translate(`data.wishes.${index}.1`, sender)}</cite>
        </blockquote>
      ))}
    </Section>
  )
}
