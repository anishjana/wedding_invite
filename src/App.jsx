import { useState } from "react";
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

export default function App() {
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);

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
        onOpen={() => setIsCurtainOpen(true)}
      />
      <StaticBackground />
    </main>
  );
}
