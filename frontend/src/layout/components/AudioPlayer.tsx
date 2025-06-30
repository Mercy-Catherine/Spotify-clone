import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const { currentSong, isPlaying, playNext, isRepeat } = usePlayerStore();

  // Play/pause logic
  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  // Song end (add repeat logic here)
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      if (isRepeat && audio) {
        audio.currentTime = 0;
        audio.pause();
        audio.load();
        audio.play().catch((err) =>
          console.error("Failed to repeat playback:", err)
        );
      } else {
        playNext();
      }
    };

    audio?.addEventListener("ended", handleEnded);
    return () => audio?.removeEventListener("ended", handleEnded);
  }, [playNext, isRepeat]);

  // Song changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;
    const isSongChange = prevSongRef.current !== currentSong.audioUrl;

    if (isSongChange) {
      audio.src = currentSong.audioUrl;
      audio.currentTime = 0;
      prevSongRef.current = currentSong.audioUrl;

      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
