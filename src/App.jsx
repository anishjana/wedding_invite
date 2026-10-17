import { useRef, useState } from "react";
import { useTranslation } from "./hooks/useTranslation";
import FallingConfetti from "./components/FallingConfetti";
import StaticBackground from "./components/StaticBackground";
import Ceremonies from "./components/Ceremonies";
import FinalRsvp from "./components/FinalRsvp";
import Hero from "./components/Hero";
import Invitation from "./components/Invitation";
import Moments from "./components/Moments";
import SaveTheDate from "./components/SaveTheDate";
import Story from "./components/Story";
import Curtains from "./components/Curtains";
import MusicPlayer from "./components/MusicPlayer";
import LanguageToggle from "./components/LanguageToggle";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const swapCouple =
    new URLSearchParams(window.location.search).get("v") === "v1";
  const { translate } = useTranslation(language);
  const musicPlayerRef = useRef(null);
  const chimeRef = useRef(null);

  const playRevealChime = () => {
    const chime = chimeRef.current;
    if (!chime) return;

    chime.currentTime = 0;
    chime.volume = 0.6;
    chime.play().catch((error) => {
      console.error("Curtain reveal chime playback failed:", error);
    });
  };

  return (
    <main
      className={language === "bn" ? "language-bengali" : undefined}
      lang={language}
    >
      {isCurtainOpen && (
        <>
          <FallingConfetti />
          <Hero
            revealDirection="left"
            curtainsOpened={isCurtainOpen}
            language={language}
            swapCouple={swapCouple}
            translate={translate}
          />
          <SaveTheDate revealDirection="right" translate={translate} />
          <Ceremonies revealDirection="left" translate={translate} />
          <Invitation revealDirection="right" translate={translate} />
          <Story revealDirection="left" translate={translate} />
          <Moments revealDirection="right" translate={translate} />
          <FinalRsvp revealDirection="left" translate={translate} />
        </>
      )}
      <Curtains
        keepFrame={false}
        translate={translate}
        onOpen={() => {
          musicPlayerRef.current?.start();
          playRevealChime();
          setIsCurtainOpen(true);
        }}
      />
      <MusicPlayer
        ref={musicPlayerRef}
        visible={isCurtainOpen}
        translate={translate}
      />
      <LanguageToggle
        visible={isCurtainOpen}
        language={language}
        translate={translate}
        onLanguageChange={setLanguage}
      />
      <audio
        ref={chimeRef}
        src={`${import.meta.env.BASE_URL}music-effect/chime.mp3`}
        preload="auto"
      />
      <StaticBackground />
      <Analytics />
    </main>
  );
}
