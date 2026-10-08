import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * Standalone fixed background. Renders no children: drop it anywhere
 * (usually once, near the root) and the rest of your page sits on top.
 *
 *   <StaticBackground />
 *   <YourPage />
 *
 * Props (all optional):
 *   src      image URL (defaults to ./background.jpeg)
 *   size     CSS background-size: "cover" | "contain" (default "cover")
 *   position CSS background-position (default "center")
 *   color    color shown behind / while the image loads (default "#f8f2ee")
 */
export default function StaticBackground({
  src = `${import.meta.env.BASE_URL}images/background.png`,
  size = "cover",
  position = "center",
  color = "#f8f2ee",
}) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <motion.div
      aria-hidden="true"
      className="background-image"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        backgroundColor: color,
        backgroundImage: `url(${src})`,
        backgroundSize: size,
        backgroundPosition: position,
        backgroundRepeat: "no-repeat",
        y: reduceMotion ? 0 : y,
        scale: reduceMotion ? 1 : 1.08,
      }}
    />
  );
}
