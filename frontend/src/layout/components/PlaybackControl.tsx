import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/stores/usePlayerStore";
import {
  Laptop2,
  ListMusic,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SongDetailsModal from "./SongDetailsModal";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const PlaybackControl = () => {
  const {
    isPlaying,
    togglePlay,
    playNext,
    playPrevious,allSongs,
    isShuffle,toggleShuffle,isRepeat,toggleRepeat,
  } = usePlayerStore();

  const currentSong = usePlayerStore((state) => state.currentSong);

  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queueVisible, setQueueVisible] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");

    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    const handleEnded = () => {
		const { isRepeat, currentSong, playNext } = usePlayerStore.getState();

		if (isRepeat && audioRef.current && currentSong) {
			// Fix: Force reload to prevent "ended" state from blocking play
			audioRef.current.currentTime = 0;
			audioRef.current.pause(); // just in case
			audioRef.current.load();  // <-- force reload
			audioRef.current.play().catch((err) => {
			console.error("Error restarting song:", err);
			});
		} else {
			playNext();
		}
	};



    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
  };

  return (
    <footer className='h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4'>
      <div className='flex justify-between items-center h-full max-w-[1800px] mx-auto'>
        {/* currently playing song */}
        <div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]'>
          {currentSong && (
            <>
              <img
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className='w-14 h-14 object-cover rounded-md'
              />
              <div className='flex-1 min-w-0'>
                <div className='font-medium truncate hover:underline cursor-pointer'>
                  {currentSong.title}
                </div>
                <div className='text-sm text-zinc-400 truncate hover:underline cursor-pointer'>
                  {currentSong.artist}
                </div>
              </div>
            </>
          )}
        </div>

        {/* player controls */}
        <div className='flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]'>
          <div className='flex items-center gap-4 sm:gap-6'>
            <Button
				size='icon'
				variant='ghost'
				className={`hidden sm:inline-flex hover:text-white ${
					isShuffle ? "text-emerald-400 " : "text-zinc-400"
				}`}
				onClick={toggleShuffle}
				>
				<Shuffle className='h-4 w-4' />
			</Button>


            <Button
              size='icon'
              variant='ghost'
              className='hover:text-white text-zinc-400'
              onClick={playPrevious}
              disabled={!currentSong}
            >
              <SkipBack className='h-4 w-4' />
            </Button>

            <Button
              size='icon'
              className='bg-white hover:bg-white/80 text-black rounded-full h-8 w-8'
              onClick={togglePlay}
              disabled={!currentSong}
            >
              {isPlaying ? <Pause className='h-5 w-5' /> : <Play className='h-5 w-5' />}
            </Button>
            <Button
              size='icon'
              variant='ghost'
              className='hover:text-white text-zinc-400'
              onClick={playNext}
              disabled={!currentSong}
            >
              <SkipForward className='h-4 w-4' />
            </Button>
            <Button
				size='icon'
				variant='ghost'
				onClick={toggleRepeat}
				className={`hidden sm:inline-flex hover:text-white ${
					isRepeat ? "text-emerald-400" : "text-zinc-400"
				}`}
				>
				<Repeat className='h-4 w-4' />
			</Button>

          </div>

          <div className='hidden sm:flex items-center gap-2 w-full'>
            <div className='text-xs text-zinc-400'>{formatTime(currentTime)}</div>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              className='w-full hover:cursor-grab active:cursor-grabbing'
              onValueChange={handleSeek}
            />
            <div className='text-xs text-zinc-400'>{formatTime(duration)}</div>
          </div>
        </div>

        {/* volume + controls */}
        <div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end'>
          
          <Button
            size='icon'
            variant='ghost'
            className='hover:text-white text-zinc-400'
            onClick={() => setQueueVisible(true)}
          >
            <ListMusic className='h-4 w-4' />
          </Button>

          <Button
			size='icon'
			variant='ghost'
			className='hover:text-white text-zinc-400'
			onClick={() => setDetailsOpen(true)}
			>
			<Laptop2 className='h-4 w-4' />
		</Button>

		<SongDetailsModal open={detailsOpen} onOpenChange={setDetailsOpen} />


          <div className='flex items-center gap-2'>
            <Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'>
              <Volume1 className='h-4 w-4' />
            </Button>
            <Slider
              value={[volume]}
              max={100}
              step={1}
              className='w-24 hover:cursor-grab active:cursor-grabbing'
              onValueChange={(value) => {
                setVolume(value[0]);
                if (audioRef.current) {
                  audioRef.current.volume = value[0] / 100;
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Queue Modal */}
      <Dialog open={queueVisible} onOpenChange={setQueueVisible}>
  <DialogContent className='bg-zinc-800 text-white'>
    <DialogHeader>
      <DialogTitle className='text-lg'>Queue</DialogTitle>
    </DialogHeader>
    <div className='space-y-2 max-h-80 overflow-y-auto'>
      {allSongs.length ? (
        allSongs.map((song, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 p-1 rounded ${
              song._id === currentSong?._id ? "bg-zinc-700" : ""
            }`}
          >
            <img src={song.imageUrl} alt={song.title} className='w-10 h-10 rounded-md' />
            <div className='flex flex-col'>
              <span className='text-sm font-medium'>{song.title}</span>
              <span className='text-xs text-zinc-400'>{song.artist}</span>
            </div>
          </div>
        ))
      ) : (
        <p className='text-sm text-zinc-400'>Queue is empty.</p>
      )}
    </div>
  </DialogContent>
</Dialog>

    </footer>
  );
};

export default PlaybackControl;
