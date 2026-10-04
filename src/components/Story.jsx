import { couple } from '../data'
import Section, { SectionHeading } from './Section'

export default function Story() {
  return (
    <Section>
      <SectionHeading eyebrow="Our Journey" first="How our" second="Story began" />
      <p className="quote">“Our journey began on a quiet college campus evening. From late-night project deadlines to lifelong partners, our love has only grown stronger with every passing year.”</p>
      <p className="gold">{couple.tag}</p>
    </Section>
  )
}
