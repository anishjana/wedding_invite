import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";

const TRACKS = ["bengali.mp3", "hindi.mp3"];
const VOLUME = 0.3;
const FADE_IN_DURATION = 5000;

const MusicPlayer = forwardRef(function MusicPlayer({ visible }, ref) {
  const audioRef = useRef(null);
  const trackRef = useRef("");
  const fadeFrameRef = useRef(null);
  const playbackAttemptRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackError, setPlaybackError] = useState("");

  const stopFade = () => {
    if (fadeFrameRef.current !== null) {
      cancelAnimationFrame(fadeFrameRef.current);
      fadeFrameRef.current = null;
    }
  };

  const fadeInAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    stopFade();

    const startedAt = performance.now();
    const updateVolume = (now) => {
      const progress = Math.min((now - startedAt) / FADE_IN_DURATION, 1);
      audio.volume = VOLUME * progress;
      if (progress < 1) {
        fadeFrameRef.current = requestAnimationFrame(updateVolume);
      } else {
        fadeFrameRef.current = null;
      }
    };
    fadeFrameRef.current = requestAnimationFrame(updateVolume);
  };

  const startPlayback = async () => {
    const audio = audioRef.current;
    if (!audio || playbackAttemptRef.current) return;
    if (!audio.paused) return;

    if (!trackRef.current) {
      const track = TRACKS[Math.floor(Math.random() * TRACKS.length)];
      trackRef.current = `${import.meta.env.BASE_URL}music/${track}`;
      audio.src = trackRef.current;
      audio.load();
    }

    playbackAttemptRef.current = true;
    audio.volume = 0;
    audio.loop = true;
    setPlaybackError("");
    try {
      await audio.play();
      if (!audio.paused) {
        setIsPlaying(true);
        fadeInAudio();
      }
    } catch (error) {
      console.error("Music playback failed:", error);
      setIsPlaying(false);
      setPlaybackError(
        "Music playback failed. Activate the music button to retry.",
      );
    } finally {
      playbackAttemptRef.current = false;
    }
  };

  useImperativeHandle(ref, () => ({ start: startPlayback }));

  useEffect(
    () => () => {
      stopFade();
      audioRef.current?.pause();
    },
    [],
  );

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      stopFade();
      audio.pause();
      setIsPlaying(false);
    } else {
      startPlayback();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          stopFade();
          setIsPlaying(false);
          setPlaybackError("Music could not be loaded.");
        }}
      />
      {visible && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          type="button"
          className={`imm-music-btn${isPlaying ? " playing" : ""}`}
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          aria-pressed={isPlaying}
          title={playbackError || (isPlaying ? "Pause music" : "Play music")}
        >
          {isPlaying ? (
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5.8a1 1 0 0 1 1.5-.86l10 6.2a1 1 0 0 1 0 1.72l-10 6.2A1 1 0 0 1 8 18.2z" />
            </svg>
          )}
        </motion.button>
      )}
      <span className="sr-only" role="status" aria-live="polite">
        {playbackError}
      </span>
    </>
  );
});

export default MusicPlayer;
