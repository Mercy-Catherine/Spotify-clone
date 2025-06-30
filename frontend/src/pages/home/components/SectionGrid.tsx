import type { Song } from "@/types";
import { Button } from "@/components/ui/button";
import SectionGridSkeleton from "./SectionGridSkeleton";
import PlayButton from "./PlayButton";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePlayerStore } from "@/stores/usePlayerStore";

type SectionGridProps = {
	title: string;
	songs: Song[];
	isLoading: boolean;
};
const SectionGrid = ({ songs, title, isLoading }: SectionGridProps) => {
	const [showAllVisible, setShowAllVisible] = useState(false);
	const {
		allSongs = [],
	  } = usePlayerStore();

	if (isLoading) return <SectionGridSkeleton />;

	return (
		<div className='mb-8'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-xl sm:text-2xl font-bold'>{title}</h2>
				<Button variant='link' className='text-sm text-zinc-400 hover:text-white' onClick={() => setShowAllVisible(true)}>
					Show all
				</Button>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
				{songs.map((song) => (
					<div
						key={song._id}
						className='bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer'
					>
						<div className='relative mb-4'>
							<div className='aspect-square rounded-md shadow-lg overflow-hidden'>
								<img
									src={song.imageUrl}
									alt={song.title}
									className='w-full h-full object-cover transition-transform duration-300 
									group-hover:scale-105'
								/>
							</div>
							<PlayButton song={song} />
						</div>
						<h3 className='font-medium mb-2 truncate'>{song.title}</h3>
						<p className='text-sm text-zinc-400 truncate'>{song.artist}</p>
					</div>
				))}
			</div>

			{/* Show All Modal */}
				  <Dialog open={showAllVisible} onOpenChange={setShowAllVisible}>
					<DialogContent className='bg-zinc-800 text-white'>
					  <DialogHeader>
						<DialogTitle className='text-lg'>All Songs</DialogTitle>
					  </DialogHeader>
					  <div className='space-y-2 max-h-80 overflow-y-auto'>
						{allSongs.length ? (
						  allSongs.map((song, i) => (
							<div key={i} className='flex items-center gap-2'>
							  <img src={song.imageUrl} alt={song.title} className='w-10 h-10 rounded-md' />
							  <div className='flex flex-col'>
								<span className='text-sm font-medium'>{song.title}</span>
								<span className='text-xs text-zinc-400'>{song.artist}</span>
							  </div>
							</div>
						  ))
						) : (
						  <p className='text-sm text-zinc-400'>No songs available.</p>
						)}
					  </div>
					</DialogContent>
				  </Dialog>
		</div>
	);
};
export default SectionGrid;