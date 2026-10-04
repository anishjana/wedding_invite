import { wishes } from '../data'
import Section, { SectionHeading } from './Section'

export default function Wishes() {
  return (
    <Section>
      <SectionHeading eyebrow="Shower of Blessings" first="Greetings &" second="Love" />
      {wishes.map(([message, sender]) => (
        <blockquote key={sender}>“{message}”<cite>— {sender}</cite></blockquote>
      ))}
    </Section>
  )
}
