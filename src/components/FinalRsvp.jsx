import { Suspense, lazy, useState } from "react";
import { couple } from "../data";
import Section from "./Section";

const RSVP = lazy(() => import("./RSVP"));

export default function FinalRsvp({ revealDirection = "right" }) {
  const [showRsvp, setShowRsvp] = useState(false);

  return (
    <>
      <Section className="final" revealDirection={revealDirection}>
        <p className="gold">
          Kindly RSVP by November 15th to help us prepare the royal welcome for
          you.
        </p>
        <button className="btn" onClick={() => setShowRsvp(true)}>
          Joyfully Accept / RSVP Now
        </button>
        <p className="d">
          RSVP simply means — please let us know if you'll be able to join us.
        </p>
        <p className="gold final-couple-tag">{couple.tag}</p>
      </Section>
      {showRsvp && (
        <Suspense
          fallback={
            <div className="modal" role="status" aria-live="polite">
              Loading RSVP...
            </div>
          }
        >
          <RSVP onClose={() => setShowRsvp(false)} />
        </Suspense>
      )}
    </>
  );
}
