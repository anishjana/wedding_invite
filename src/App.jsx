import { useRef, useState } from "react";
import FallingConfetti from "./components/FallingConfetti";
import StaticBackground from "./components/StaticBackground";
import Ceremonies from "./components/Ceremonies";
import FinalRsvp from "./components/FinalRsvp";
import GuestDetails from "./components/GuestDetails";
import Hero from "./components/Hero";
import Invitation from "./components/Invitation";
import Moments from "./components/Moments";
import SaveTheDate from "./components/SaveTheDate";
import Story from "./components/Story";
import Wishes from "./components/Wishes";
import Curtains from "./components/Curtains";
import PolaroidLineCarousel from "./components/Carousel";
import MusicPlayer from "./components/MusicPlayer";

export default function App() {
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
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
    <main>
      {isCurtainOpen && (
        <>
          <FallingConfetti />
          <Hero revealDirection="right" curtainsOpened={isCurtainOpen} />
          <Invitation revealDirection="left" />
          <Story revealDirection="right" />
          <SaveTheDate revealDirection="left" />
          <Ceremonies revealDirection="right" />
          <Moments revealDirection="left" />
          <FinalRsvp revealDirection="right" />
        </>
      )}
      <Curtains
        keepFrame={false}
        onOpen={() => {
          setIsCurtainOpen(true);
          musicPlayerRef.current?.start();
          playRevealChime();
        }}
      />
      <MusicPlayer ref={musicPlayerRef} visible={isCurtainOpen} />
      <audio
        ref={chimeRef}
        src={`${import.meta.env.BASE_URL}music-effect/chime.mp3`}
        preload="auto"
      />
      <StaticBackground />
    </main>
  );
}
