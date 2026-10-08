import { couple } from "../data";
import Section, { SectionHeading } from "./Section";

export default function Story() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Our Journey"
        first="How our"
        second="Story began"
      />
      <p className="quote story">
        “It was in this beautiful place that two strangers became something
        more. Years later, we’re coming back to where it all began, to promise
        each other forever. <br></br>From being friends to soulmates, our
        journey has been filled with love, laughter, and countless memories.And
        with your presence, we will create many more.”
      </p>
      <p className="gold">{couple.tag}</p>
    </Section>
  );
}
