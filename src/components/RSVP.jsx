import { useState } from "react";

export default function RSVP({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    guests: 1,
    attend: "yes",
    note: "",
  });
  const [isSent, setIsSent] = useState(false);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };
  const guestCount = Number(form.guests);
  const canSubmit =
    form.name.trim().length > 0 &&
    Number.isInteger(guestCount) &&
    guestCount >= 1 &&
    guestCount <= 10;

  const submitForm = () => {
    if (!canSubmit) return;
    console.log("RSVP", {
      ...form,
      name: form.name.trim(),
      guests: guestCount,
    });
    setIsSent(true);
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="panel" onClick={(event) => event.stopPropagation()}>
        {isSent ? (
          <>
            <h3>Thank you, {form.name}!</h3>
            <p>Your response has been noted.</p>
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </>
        ) : (
          <div className="form">
            <h3>RSVP</h3>
            <input
              required
              placeholder="Your name"
              value={form.name}
              onChange={updateField("name")}
            />
            <select value={form.attend} onChange={updateField("attend")}>
              <option value="yes">Joyfully Accept</option>
              <option value="no">Regretfully Decline</option>
            </select>
            <input
              type="number"
              required
              min="1"
              max="10"
              value={form.guests}
              onChange={updateField("guests")}
            />
            <textarea
              placeholder="A message for the couple"
              value={form.note}
              onChange={updateField("note")}
            />
            <button className="btn" disabled={!canSubmit} onClick={submitForm}>
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
