import { gallery } from '../data'
import Section, { SectionHeading } from './Section'

export default function Moments() {
  return (
    <Section>
      <SectionHeading eyebrow="Our Moments" first="The" second="Gallery" />
      <div className="gal">
        {gallery.map((moment, index) => (
          <figure key={moment.src}>
            <img src={moment.src} alt={`Moment ${index + 1}`} loading="lazy" />
            <figcaption>{moment.label}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
