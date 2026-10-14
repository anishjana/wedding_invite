import { motion, useReducedMotion } from "framer-motion";
import { DATE, DATE_LABEL, couple } from "../data";
import { useRevealOnScroll } from "./Section";

export default function Hero({
  revealDirection = "right",
  curtainsOpened = true,
}) {
  const reduceMotion = useReducedMotion();
  const revealProps = useRevealOnScroll(revealDirection);

  return (
    <motion.section {...revealProps} className="hero">
      <motion.div
        style={{
          display: "grid",
          placeContent: "center",
          justifyItems: "center",
          textAlign: "center",
        }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: curtainsOpened ? 1 : 0,
          scale: curtainsOpened ? 1 : 0.8,
        }}
        transition={{
          duration: reduceMotion ? 0 : 3,
          delay: reduceMotion ? 0 : 0.8,
          ease: "easeInOut",
        }}
      >
        <h1>{couple.a}</h1>
        <span className="amp">&</span>
        <h1>{couple.b}</h1>
        <div className="hero-details mt-10 text-lg">
          <p className="tracking-[0.15em]">are getting married</p>
          <div className="hero-date-venue">
            <div className="hero-date-venue-item">
              <p className="hero-detail-label">on</p>
              <p className="gold">• {DATE_LABEL} •</p>
            </div>
            <div className="hero-date-venue-item">
              <p className="hero-detail-label">at</p>
              <p className="gold">• {couple.venue} •</p>
            </div>
          </div>
        </div>

        <p className="gold mt-14 mb-4">{couple.tag}</p>
      </motion.div>
      <motion.div
        className="scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1, ease: "easeInOut" }}
      >
        Scroll to begin ↓
      </motion.div>
    </motion.section>
  );
}
