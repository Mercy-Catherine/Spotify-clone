
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePlayerStore } from "@/stores/usePlayerStore";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};


const SongDetailsModal = ({ open, onOpenChange }: Props) => {
  const { currentSong } = usePlayerStore();

  if (!currentSong) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border border-zinc-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{currentSong.title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <img
            src={currentSong.imageUrl}
            alt={currentSong.title}
            className="w-full h-auto rounded-lg"
          />

          <div>
            <p className="text-sm text-zinc-400">Artist:</p>
            <p className="text-base">{currentSong.artist}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SongDetailsModal;
