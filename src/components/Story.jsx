import { couple } from "../data";
import Section, { SectionHeading } from "./Section";

export default function Story({
  revealDirection = "right",
  translate = (_key, fallback) => fallback,
}) {
  return (
    <Section revealDirection={revealDirection}>
      <SectionHeading
        eyebrow={translate("story.eyebrow", "Our Journey")}
        first={translate("story.heading_first", "How our")}
        second={translate("story.heading_second", "Story began")}
      />
      <p className="quote story">
        {translate(
          "story.quote",
          "It was in this beautiful place that two strangers became something more. Years later, we’re coming back to where it all began, to promise each other forever. From being friends to soulmates, our journey has been filled with love, laughter, and countless memories. And with your presence, we will create many more.",
        )}
      </p>
      <p className="gold">{translate("data.couple.tag", couple.tag)}</p>
    </Section>
  );
}
