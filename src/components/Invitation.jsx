import { useState } from "react";
import { motion } from "framer-motion";
import { families } from "../data";
import { useRevealOnScroll } from "./Section";

export default function Invitation({
  revealDirection = "right",
  translate = (_key, fallback) => fallback,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const revealProps = useRevealOnScroll(revealDirection);

  const openWithKeyboard = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <motion.section {...revealProps} className="sec invite">
      <small>{translate("invitation.eyebrow", "You Are Invited")}</small>
      <div
        className={`env ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onKeyDown={openWithKeyboard}
      >
        <div className="flap" />
        <div className="seal">
          <img src={`${import.meta.env.BASE_URL}icons/logo-round.png`} alt="" />
        </div>
        <div className="card">
          <h3>
            {translate("invitation.card_title", "With Joy We Invite You")}
          </h3>
          <p className="quote">
            {translate(
              "invitation.quote",
              "With the blessings of the divine and the love of our families, we invite you to celebrate our union.",
            )}
          </p>
          {families.map((family, index) => (
            <div key={family.title} className="fam">
              <h4>
                {translate(`data.families.${index}.title`, family.title)}
              </h4>
              <p>{translate(`data.families.${index}.host`, family.host)}</p>
              {/* <p><small>Paternal Grandparents</small>{family.pg}</p>
              <p><small>Maternal Grandparents</small>{family.mg}</p> */}
            </div>
          ))}
        </div>
        {!isOpen && (
          <span className="tap">
            {translate("invitation.open_hint", "Tap to open")}
          </span>
        )}
      </div>
    </motion.section>
  );
}
