import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function RSVP({
  onClose,
  translate = (_key, fallback) => fallback,
}) {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState({
    name: "",
    guests: 1,
    attend: "yes",
    note: "",
  });
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };
  const guestCount = Number(form.guests);
  const canSubmit =
    form.name.trim().length > 0 &&
    Number.isInteger(guestCount) &&
    guestCount >= 1 &&
    guestCount <= 10;

  const submitForm = async () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await addDoc(collection(db, "rsvps"), {
        name: form.name.trim(),
        guests: guestCount,
        attend: form.attend,
        note: form.note,
        timestamp: serverTimestamp(),
      });
      setIsSent(true);
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setSubmitError(
        translate(
          "rsvp.submit_error",
          "Could not send your RSVP. Please try again.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="modal"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.25 }}
    >
      <motion.div
        className="panel"
        onClick={(event) => event.stopPropagation()}
        initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {isSent ? (
          <>
            <h3>
              {translate("rsvp.thank_you", "Thank you, {name}!").replace(
                "{name}",
                form.name,
              )}
            </h3>
            <p>{translate("rsvp.confirmation", "Your response has been noted.")}</p>
            <button className="btn" onClick={onClose}>
              {translate("rsvp.close", "Close")}
            </button>
          </>
        ) : (
          <div className="form">
            <h3>{translate("rsvp.title", "RSVP")}</h3>
            <input
              required
              placeholder={translate("rsvp.name", "Your name")}
              value={form.name}
              onChange={updateField("name")}
            />
            <select value={form.attend} onChange={updateField("attend")}>
              <option value="yes">
                {translate("rsvp.accept", "Joyfully Accept")}
              </option>
              <option value="no">
                {translate("rsvp.decline", "Regretfully Decline")}
              </option>
            </select>
            <input
              type="number"
              required
              min="1"
              max="10"
              aria-label={translate("rsvp.guest_count", "Number of guests")}
              value={form.guests}
              onChange={updateField("guests")}
            />
            <textarea
              placeholder={translate(
                "rsvp.message",
                "A message for the couple",
              )}
              value={form.note}
              onChange={updateField("note")}
            />
            {submitError && (
              <p className="error">
                {translate("rsvp.error", "Error")}: {submitError}
              </p>
            )}
            <button
              className="btn"
              disabled={!canSubmit || isSubmitting}
              onClick={submitForm}
            >
              {isSubmitting
                ? translate("rsvp.sending", "Sending...")
                : translate("rsvp.send", "Send")}
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
