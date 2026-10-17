import { motion, useReducedMotion } from "framer-motion";
import { events } from "../data";
import Section, { SectionHeading } from "./Section";
import { useEffect } from "react";

const calendarUrl = (event) =>
  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&dates=${event.start}/${event.end}&location=${encodeURIComponent(event.at)}&details=${encodeURIComponent(event.desc)}`;
const mapUrl = (event) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.at)}`;
const VIDEO_BACKGROUNDS = {
  "Sangeet & Engagement": "sangeet.mp4",
  "Haldi Ceremony": "haldi.mp4",
  "Shubh Vivah": "shubh vivaah.mp4",
  Reception: "reception.mp4",
};

const cardVariants = (index) => ({
  hidden: {
    opacity: 0,
    y: 36,
    rotateX: 10,
    rotate: index % 2 === 0 ? -1.5 : 1.5,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
});

export default function Ceremonies({
  revealDirection = "right",
  translate = (_key, fallback) => fallback,
}) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleVisibilityChange = () => {
      const videos = document.querySelectorAll(".ev-background-video");
      if (document.hidden) {
        videos.forEach((video) => {
          video.pause();
        });
      } else {
        videos.forEach((video) => {
          video.play().catch(() => {}); // ignore play errors
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <Section revealDirection={revealDirection}>
      <SectionHeading
        eyebrow={translate("ceremonies.section_eyebrow", "The Sacred Rites")}
        first={translate("ceremonies.section_title.0", "The")}
        second={translate("ceremonies.section_title.1", "Ceremonies")}
      />
      <motion.div className="grid ceremony-grid">
        {events.map((event, index) => (
          <motion.article
            key={event.name}
            className={`ev${VIDEO_BACKGROUNDS[event.name] ? " ev-video" : ""}`}
            variants={cardVariants(index)}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: false, amount: 0.25 }}
            whileHover={reduceMotion ? undefined : { y: -6, scale: 1.025 }}
            transition={{ duration: 0.25 }}
          >
            {VIDEO_BACKGROUNDS[event.name] && (
              <>
                <video
                  ref={(el) => {
                    if (el) {
                      const observer = new IntersectionObserver(
                        (entries) => {
                          entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                              el.play().catch((e) =>
                                console.warn("Video play failed", e),
                              );
                            } else {
                              el.pause();
                            }
                          });
                        },
                        { threshold: 0.1 },
                      );
                      observer.observe(el);
                      return () => observer.disconnect();
                    }
                  }}
                  className="ev-background-video"
                  src={`${import.meta.env.BASE_URL}video-bg/${VIDEO_BACKGROUNDS[event.name]}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                />
                <div className="ev-background-overlay" aria-hidden="true" />
              </>
            )}
            <div className="mt-4">
              <span className="ic">
                {event.iconImage ? (
                  <img src={event.iconImage} alt="" />
                ) : (
                  event.icon
                )}
              </span>
              <h3>{translate(`data.events.${index}.name`, event.name)}</h3>
              <p className="gold">
                {translate(`data.events.${index}.when`, event.when)}
              </p>
              <p>{translate(`data.events.${index}.at`, event.at)}</p>
              {/* <p><small>Dress: </small>{event.dress}</p> */}
              <p className="d">
                {translate(`data.events.${index}.desc`, event.desc)}
              </p>
              <div className="row">
                <a href={mapUrl(event)} target="_blank" rel="noreferrer">
                  {translate("ceremonies.map", "Map")}
                </a>
                <a href={calendarUrl(event)} target="_blank" rel="noreferrer">
                  {translate("ceremonies.google_calendar", "Google Calendar")}
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
