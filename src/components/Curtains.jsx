import { useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * Wedding curtain reveal
 * npm i framer-motion
 *
 * - Pull the gold tassel down (or press Enter/Space on it) to open
 * - Or use the button fixed at the bottom of the screen
 * - Curtains gather at the sides afterwards, framing your page
 *
 * Usage:
 *   <WeddingCurtainReveal
 *     onOpen={() => setRevealed(true)}
 *     onClose={() => setRevealed(false)}
 *   />
 *   {revealed && <YourComponents />}
 *
 * Render your own content underneath; this component is a transparent
 * overlay that never blocks clicks on the page once the curtains are open.
 * Set keepFrame={false} to remove the curtains entirely after they open.
 */

const CURTAIN = "#3e1c0f";
const GOLD = "linear-gradient(90deg,#7a5c22,#ecd391 45%,#a88236 62%,#6a4e1a)";
const EASE = [0.77, 0, 0.18, 1];
const PULL_MAX = 150;
const DRAG_REVEAL_PROGRESS = 1.1;
const CORD_BASE = 110;

const velvet = (side) => ({
  backgroundColor: CURTAIN,
  backgroundImage: [
    // inner-edge shadow where the two panels meet
    `linear-gradient(to ${side === "left" ? "left" : "right"}, rgba(0,0,0,.55), rgba(0,0,0,0) 7%)`,
    // top/bottom depth
    "linear-gradient(180deg, rgba(0,0,0,.4), rgba(0,0,0,0) 22%, rgba(0,0,0,0) 68%, rgba(0,0,0,.5))",
    // vertical velvet folds
    "repeating-linear-gradient(90deg, rgba(0,0,0,.4) 0px, rgba(255,226,196,.09) 22px, rgba(0,0,0,.04) 40px, rgba(0,0,0,.42) 64px)",
  ].join(","),
});

function Tassel({ onPull, onDragProgress, onRelease, hidden }) {
  const y = useMotionValue(0);
  const cordHeight = useTransform(y, (v) => CORD_BASE + v);

  return (
    <motion.div
      aria-hidden={hidden}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 30,
        left: "50%",
        width: 0,
        zIndex: 40,
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      {/* ring */}
      <div
        style={{
          position: "absolute",
          left: -7,
          top: -4,
          width: 14,
          height: 14,
          borderRadius: "50%",
          border: "2.5px solid #d8bb6a",
          background: "#3e1c0f",
        }}
      />
      {/* cord */}
      <motion.div
        style={{
          position: "absolute",
          left: -1.5,
          top: 6,
          width: 3,
          height: cordHeight,
          background:
            "repeating-linear-gradient(180deg,#c9a553 0 3px,#8a6a2b 3px 6px)",
          borderRadius: 2,
        }}
      />
      {/* tassel (draggable) */}
      <motion.div
        role="button"
        tabIndex={hidden ? -1 : 0}
        aria-label="Pull the tassel to open the curtains"
        drag="y"
        dragConstraints={{ top: 0, bottom: PULL_MAX }}
        dragElastic={0.12}
        whileDrag={{ cursor: "grabbing" }}
        onDrag={(_, info) => onDragProgress(info.offset.y)}
        onDragEnd={(_, info) => {
          if (info.offset.y >= PULL_MAX * 0.95) onPull();
          else {
            animate(y, 0, { type: "spring", stiffness: 500, damping: 30 });
            onRelease();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onPull();
          }
        }}
        style={{
          y,
          position: "absolute",
          left: -22,
          top: CORD_BASE + 2,
          width: 44,
          cursor: "grab",
          touchAction: "none",
          outlineOffset: 6,
        }}
      >
        <motion.svg
          width="44"
          height="104"
          viewBox="0 0 44 104"
          style={{ transformOrigin: "50% 0", display: "block" }}
          animate={{ rotate: [0, 2.5, 0, -2.5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id="tg" x1="0" x2="1">
              <stop offset="0" stopColor="#7a5c22" />
              <stop offset=".45" stopColor="#f1da9b" />
              <stop offset=".7" stopColor="#b08a3a" />
              <stop offset="1" stopColor="#6a4e1a" />
            </linearGradient>
          </defs>
          {/* knob */}
          <circle cx="22" cy="14" r="11" fill="url(#tg)" />
          <rect x="17" y="24" width="10" height="8" rx="2" fill="url(#tg)" />
          {/* collar */}
          <rect x="9" y="31" width="26" height="7" rx="3.5" fill="url(#tg)" />
          {/* skirt strands */}
          {Array.from({ length: 11 }).map((_, i) => {
            const x = 10 + i * 2.4;
            return (
              <path
                key={i}
                d={`M${x} 38 L${x + (i - 5) * 0.7} 100`}
                stroke="url(#tg)"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
            );
          })}
          <rect
            x="8"
            y="62"
            width="28"
            height="3"
            rx="1.5"
            fill="#8a6a2b"
            opacity=".7"
          />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}

export default function WeddingCurtainReveal({
  onOpen,
  onClose,
  keepFrame = true,
}) {
  const [open, setOpen] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [gone, setGone] = useState(false);
  const reduce = useReducedMotion();
  const curtainProgress = useMotionValue(0);
  const curtainScale = useTransform(curtainProgress, [0, 1, 1.2], [1, 0.16, 0]);
  const valanceY = useTransform(curtainProgress, [0, 1], ["0%", "-100%"]);

  const setOpenState = (next) => {
    setOpen(next);
    if (next) {
      animate(curtainProgress, keepFrame ? 1 : 1.2, {
        duration: reduce ? 0.01 : 2.4,
        ease: EASE,
        onComplete: () => {
          if (!keepFrame) setIsFading(true);
        },
      });
      onOpen?.();
    } else {
      animate(curtainProgress, 0, {
        type: "spring",
        stiffness: 150,
        damping: 22,
      });
      onClose?.();
    }
  };

  if (gone) return null;

  return (
    <motion.div
      initial={false}
      animate={{ opacity: isFading ? 0 : 1 }}
      transition={{
        duration: reduce ? 0.01 : 0.8,
      }}
      onAnimationComplete={() => {
        if (isFading) setGone(true);
      }}
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1000,
      }}
    >
      <style>{`
        .cr-btn:focus-visible, [role="button"]:focus-visible { outline: 2px solid #f1da9b; }
      `}</style>

      {/* Left curtain */}
      <motion.div
        initial={false}
        style={{
          ...velvet("left"),
          scaleX: curtainScale,
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          width: "50.3%",
          transformOrigin: "left center",
          zIndex: 20,
          pointerEvents: "none",
          boxShadow: "6px 0 30px rgba(0,0,0,.45)",
        }}
      />
      {/* Right curtain */}
      <motion.div
        initial={false}
        style={{
          ...velvet("right"),
          scaleX: curtainScale,
          position: "fixed",
          top: 0,
          bottom: 0,
          right: 0,
          width: "50.3%",
          transformOrigin: "right center",
          zIndex: 20,
          pointerEvents: "none",
          boxShadow: "-6px 0 30px rgba(0,0,0,.45)",
        }}
      />

      {/* Valance + rod */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 30,
          pointerEvents: "none",
          y: valanceY,
        }}
      >
        <div
          style={{
            height: 16,
            backgroundColor: CURTAIN,
            backgroundImage:
              "linear-gradient(180deg, rgba(255,226,196,.1), rgba(0,0,0,.35)), repeating-linear-gradient(90deg, rgba(0,0,0,.3) 0 14px, rgba(255,226,196,.06) 14px 28px)",
            boxShadow: "0 8px 20px rgba(0,0,0,.35)",
          }}
        />
        <div
          style={{
            height: 32,
            background: `radial-gradient(circle at 50% 0, ${CURTAIN} 0 31px, transparent 32px) 0 0 / 64px 32px repeat-x`,
            filter: "drop-shadow(0 6px 6px rgba(0,0,0,.35))",
          }}
        />
      </motion.div>

      <Tassel
        hidden={open}
        onPull={() => setOpenState(true)}
        onDragProgress={(distance) =>
          curtainProgress.set(
            Math.min(1, Math.max(0, distance / PULL_MAX)) *
              DRAG_REVEAL_PROGRESS,
          )
        }
        onRelease={() =>
          animate(curtainProgress, 0, {
            type: "spring",
            stiffness: 150,
            damping: 22,
          })
        }
      />

      {/* Bottom button */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: "max(28px, env(safe-area-inset-bottom))",
          display: "flex",
          justifyContent: "center",
          zIndex: 50,
          pointerEvents: "none",
        }}
      >
        {/* <motion.button
          className="btn"
          onClick={() => setOpenState(!open)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          Pull the tassel to open the curtains
        </motion.button> */}

        {!open && (
          <button
            className="hint-badge"
            aria-label="Open invitation"
            onClick={() => setOpenState(!open)}
          >
            <span className="hint-star">✦</span>
            <span className="hint-text">Pull to Open</span>
            <span className="hint-star">✦</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
