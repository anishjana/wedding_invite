import { motion, useReducedMotion } from "framer-motion";
import { DATE_LABEL, couple } from "../data";
import { useRevealOnScroll } from "./Section";

export default function Hero({
  revealDirection = "right",
  curtainsOpened = true,
  language = "en",
  swapCouple = false,
  translate = (_key, fallback) => fallback,
}) {
  const reduceMotion = useReducedMotion();
  const revealProps = useRevealOnScroll(revealDirection);
  const firstPartner = swapCouple ? "b" : "a";
  const secondPartner = swapCouple ? "a" : "b";

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
        <h1 className={language === "bn" ? "bengali" : undefined}>
          {translate(`data.couple.${firstPartner}`, couple[firstPartner])}
        </h1>
        <span className="amp">
          {" "}
          {translate("data.couple.and", couple.and)}{" "}
        </span>
        <h1 className={language === "bn" ? "bengali" : undefined}>
          {translate(`data.couple.${secondPartner}`, couple[secondPartner])}
        </h1>
        <div className="hero-details mt-10 text-lg">
          <p className="tracking-[0.15em]">
            {translate("hero.are_getting_married", "are getting married")}
          </p>
          <div className="hero-date-venue">
            <div className="hero-date-venue-item">
              <p className="hero-detail-label">{translate("hero.on", "on")}</p>
              <p className="gold">
                • {translate("data.date_label", DATE_LABEL)} •
              </p>
            </div>
            <div className="hero-date-venue-item">
              <p className="hero-detail-label">{translate("hero.at", "at")}</p>
              <p className="gold">
                • {translate("data.couple.venue", couple.venue)} •
              </p>
            </div>
          </div>
        </div>

        <p className="gold mt-14 mb-4 latin-text">
          {translate("data.couple.tag", couple.tag)}
        </p>
      </motion.div>
      <motion.div
        className="scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1, ease: "easeInOut" }}
      >
        ↓ {translate("hero.scroll_to_begin", "Scroll to begin")}
      </motion.div>
    </motion.section>
  );
}
