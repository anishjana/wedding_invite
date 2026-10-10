import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const cardVariants = (direction) => ({
  offscreen: {
    x: direction === "left" ? -200 : 200,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
});

export function useRevealOnScroll(direction) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.14, 0.84, 1],
    [0, 1, 1, 0.9],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.14, 0.84, 1],
    [52, 0, -18, -32],
  );
  const scale = useTransform(scrollYProgress, [0, 0.14, 1], [0.97, 1, 1]);

  return {
    ref,
    style: reduceMotion
      ? { opacity: 1, y: 0, scale: 1 }
      : direction
        ? { y, scale }
        : { opacity, y, scale },
    ...(direction && {
      initial: reduceMotion
        ? false
        : { opacity: 0, x: direction === "left" ? -52 : 52 },
      whileInView: reduceMotion ? undefined : { opacity: 1, x: 0 },
      viewport: { once: true, amount: 0.15 },
    }),
  };
}

export default function Section({
  children,
  className = "",
  revealDirection = "right",
}) {
  const revealProps = useRevealOnScroll();
  return (
    <motion.section
      {...revealProps}
      className={`sec ${className}`}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.15 }}
    >
      <motion.div className="inner" variants={cardVariants(revealDirection)}>
        {children}
      </motion.div>
    </motion.section>
  );
}

export function SectionHeading({ eyebrow, first, second }) {
  return (
    <header className="head">
      <small>{eyebrow}</small>
      <h2>
        {first} <em>{second}</em>
      </h2>
    </header>
  );
}
