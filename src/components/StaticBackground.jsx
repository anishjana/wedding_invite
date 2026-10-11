import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
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
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y = useSpring(parallaxY, { stiffness: 70, damping: 24, mass: 0.6 });

  return (
    <motion.div
      aria-hidden="true"
      className="background-image"
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        zIndex: -1,
        pointerEvents: "none",
        backgroundColor: color,
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: "-100px 0",
          y: reduceMotion ? 0 : y,
          backgroundImage: `url(${src})`,
          backgroundSize: size,
          backgroundPosition: position,
          backgroundRepeat: "no-repeat",
        }}
      />
    </motion.div>
  );
}
