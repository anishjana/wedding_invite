import { useState } from "react";
import {
  animate,
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * Wedding curtain reveal
 * npm i framer-motion
 *
 * - Pull the gold tassel down (or press Enter/Space on it) to open
 * - Or tap the illuminated marquee sign in the middle of the screen
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

// Marquee sign settings
const BULB_COUNT = 20;
const SIGN_SIZE = 160; // px, outer diameter
const BULB_RADIUS = 68; // px, distance of bulbs from center

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

function Tassel({
  onPull,
  onPullStart,
  onDragProgress,
  onRelease,
  hidden,
  translate = (_key, fallback) => fallback,
}) {
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
        aria-label={translate(
          "curtains.tassel_label",
          "Pull the tassel to open the curtains",
        )}
        drag="y"
        dragConstraints={{ top: 0, bottom: PULL_MAX }}
        dragElastic={0.12}
        onTap={onPull}
        onDragStart={onPullStart}
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
        <motion.div
          style={{
            position: "absolute",
            top: 110,
            left: 0,
            width: 44,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pointerEvents: "none",
            filter: "drop-shadow(0 1px 3px rgba(0,0,0,.8))",
          }}
          animate={{ opacity: [0.25, 0.5, 0.25], y: [0, 4, 0] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            aria-hidden="true"
            width="20"
            height="14"
            viewBox="0 0 20 14"
            style={{ overflow: "visible" }}
          >
            <path
              d="m3 3 7 7 7-7"
              fill="none"
              stroke="#f1da9b"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            aria-hidden="true"
            style={{
              color: "#f1da9b",
              fontSize: 11.5,
              fontWeight: 700,
              fontFamily: "Cormorant Garamond",
              letterSpacing: ".12em",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            Pull
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** Circular illuminated marquee sign used as the "open" button */
function MarqueeButton({ onClick, translate = (_key, fallback) => fallback }) {
  return (
    <motion.button
      type="button"
      className="mq-sign"
      aria-label={translate(
        "curtains.open_label",
        "Tap to open the invitation",
      )}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.4 }}
    >
      {/* metal ring */}
      <span className="mq-ring" aria-hidden="true" />
      {/* inner red disc */}
      <span className="mq-disc" aria-hidden="true" />

      {/* bulbs */}
      {Array.from({ length: BULB_COUNT }).map((_, i) => {
        const angle = (360 / BULB_COUNT) * i;
        return (
          <span
            key={i}
            aria-hidden="true"
            className="mq-bulb"
            style={{
              transform: `rotate(${angle}deg) translateY(-${BULB_RADIUS}px)`,
              animationDelay: `${(i % 2) * 0.6}s`,
            }}
          />
        );
      })}

      <span className="mq-text">
        {translate("curtains.open_hint", "Tap to open")}
      </span>
    </motion.button>
  );
}

export default function WeddingCurtainReveal({
  onOpen,
  onOpened,
  onClose,
  keepFrame = true,
  translate = (_key, fallback) => fallback,
}) {
  const [open, setOpen] = useState(false);
  const [isTasselPulling, setIsTasselPulling] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [gone, setGone] = useState(false);
  const reduce = useReducedMotion();
  const curtainProgress = useMotionValue(0);
  const curtainScale = useTransform(curtainProgress, [0, 1, 1.2], [1, 0.16, 0]);
  const valanceY = useTransform(curtainProgress, [0, 1], ["0%", "-100%"]);

  const setOpenState = (next) => {
    setOpen(next);
    setIsTasselPulling(false);
    if (next) {
      animate(curtainProgress, keepFrame ? 1 : 1.2, {
        duration: reduce ? 0.01 : 2.4,
        ease: EASE,
        onComplete: () => {
          onOpened?.();
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

        /* ---------- Marquee sign button ---------- */
        .mq-sign {
          position: relative;
          width: ${SIGN_SIZE}px;
          height: ${SIGN_SIZE}px;
          max-width: 70vw;
          max-height: 70vw;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          pointer-events: auto;
          -webkit-tap-highlight-color: transparent;
          filter: drop-shadow(0 14px 22px rgba(0,0,0,.6))
                  drop-shadow(0 0 28px rgba(255,170,60,.28));
        }
        .mq-sign:focus-visible { outline: 2px solid #f1da9b; outline-offset: 8px; }

        .mq-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background:
            radial-gradient(circle at 30% 25%, rgba(255,255,255,.18), rgba(255,255,255,0) 45%),
            linear-gradient(145deg, #7b6a5a, #4a4039 55%, #2e2823);
          border: 3px solid #e8a23d;
          box-shadow:
            0 0 0 1px rgba(255,205,120,.55),
            0 0 18px rgba(255,160,50,.55),
            inset 0 0 0 2px rgba(255,205,120,.35),
            inset 0 4px 10px rgba(0,0,0,.55);
        }

        .mq-disc {
          position: absolute;
          inset: 17%;
          border-radius: 50%;
          background-color: #3e1c0f;
          border: 2px solid #e8a23d;
          box-shadow:
            0 0 10px rgba(255,160,50,.5),
            inset 0 8px 18px rgba(0,0,0,.65),
            inset 0 -2px 8px rgba(255,120,80,.25);
        }

        .mq-bulb {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 15px;
          height: 15px;
          margin: -7.5px 0 0 -7.5px;
          border-radius: 50%;
          background: radial-gradient(circle at 50% 45%, #fffbe8 0 18%, #ffd980 45%, #f0a030 100%);
          border: 1.5px solid #ffcf7a;
          box-shadow:
            0 0 6px 2px rgba(255,200,100,.9),
            0 0 14px 5px rgba(255,150,40,.55);
          animation: mq-glow 1.2s ease-in-out infinite alternate;
        }

        @keyframes mq-glow {
          from { filter: brightness(.7);  box-shadow: 0 0 3px 1px rgba(255,200,100,.5), 0 0 8px 2px rgba(255,150,40,.3); }
          to   { filter: brightness(1.15); box-shadow: 0 0 7px 2px rgba(255,210,120,1), 0 0 18px 6px rgba(255,150,40,.65); }
        }

        .mq-text {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 24%;
          text-align: center;
          font-family: "Cinzel", "Playfair Display", Georgia, "Times New Roman", serif;
          font-weight: 700;
          font-size: 16px;
          line-height: 1.15;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #ffe6a8;
          text-shadow:
            0 0 4px rgba(255,220,140,.95),
            0 0 12px rgba(255,170,60,.85),
            0 0 24px rgba(255,120,30,.6);
          animation: mq-text-pulse 2.4s ease-in-out infinite;
        }

        @keyframes mq-text-pulse {
          0%, 100% { opacity: .85; }
          50%      { opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mq-bulb, .mq-text { animation: none; }
        }
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
        translate={translate}
        onPull={() => setOpenState(true)}
        onPullStart={() => setIsTasselPulling(true)}
        onDragProgress={(distance) =>
          curtainProgress.set(
            Math.min(1, Math.max(0, distance / PULL_MAX)) *
              DRAG_REVEAL_PROGRESS,
          )
        }
        onRelease={() => {
          setIsTasselPulling(false);
          animate(curtainProgress, 0, {
            type: "spring",
            stiffness: 150,
            damping: 22,
          });
        }}
      />

      {/* Center marquee button */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 50,
          pointerEvents: "none",
          bottom: "-20rem",
        }}
      >
        <AnimatePresence>
          {!open && !isTasselPulling && (
            <MarqueeButton
              onClick={() => setOpenState(true)}
              translate={translate}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
