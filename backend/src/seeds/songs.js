import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { config } from "dotenv";

config();

const songs = [
  {
    title: "Aasa Orave",
    artist: "Sean Roldan",
    imageUrl: "/cover-images/aasa-orave.jpg",
    audioUrl: "/songs/aasa-orave.mp3",
    duration: 226,
  },
  {
    title: "Adigaa",
    artist: "Karthik",
    imageUrl: "/cover-images/adigaa.jpg",
    audioUrl: "/songs/adigaa.mp3",
    duration: 210,
  },
  {
    title: "Innum Ennum",
    artist: "DexterDuke, Nevil",
    imageUrl: "/cover-images/innum-ennum.jpg",
    audioUrl: "/songs/innum-ennum.mp3",
    duration: 220,
  },
  {
    title: "Kannoramaai",
    artist: "Pogan, Ankith Jain",
    imageUrl: "/cover-images/kannoramaai.jpg",
    audioUrl: "/songs/kannoramaai.mp3",
    duration: 225,
  },
  {
    title: "Let Her Go",
    artist: "Passenger",
    imageUrl: "/cover-images/let-her-go.jpg",
    audioUrl: "/songs/let-her-go.mp3",
    duration: 252,
  },
  {
    title: "Muththa Mazhai",
    artist: "Chinmayi, Siva Ananth",
    imageUrl: "/cover-images/muththa-mazhai.jpg",
    audioUrl: "/songs/muththa-mazhai.mp3",
    duration: 240,
  },
  {
    title: "Rewrite The Stars",
    artist: "Zac Efron, Zendaya",
    imageUrl: "/cover-images/rewrite-the-stars.jpg",
    audioUrl: "/songs/rewrite-the-stars.mp3",
    duration: 217,
  },
  {
    title: "Sunshine in the Rain",
    artist: "Shania Yan",
    imageUrl: "/cover-images/sunshine-in-the-rain.jpg",
    audioUrl: "/songs/sunshine-in-the-rain.mp3",
    duration: 217,
  },
  {
    title: "TAQDEER",
    artist: "Rahul Raha",
    imageUrl: "/cover-images/taqdeer.jpg",
    audioUrl: "/songs/taqdeer.mp3",
    duration: 172,
  },
  {
    title: "Tere Bina",
    artist: "A.R. Rahman, Chinmayi",
    imageUrl: "/cover-images/tere-bina.jpg",
    audioUrl: "/songs/tere-bina.mp3",
    duration: 309,
  },
  {
    title: "Unnai Kaanadhu Naan",
    artist: "Shankar Ehsaan Loy",
    imageUrl: "/cover-images/unnai-kaanadhu-naan.jpg",
    audioUrl: "/songs/unnai-kaanadhu-naan.mp3",
    duration: 337,
  },
  {
    title: "Ye Tune Kya Kiya",
    artist: "Pritam, Javed Bashir",
    imageUrl: "/cover-images/ye-tune-kya-kiya.jpg",
    audioUrl: "/songs/ye-tune-kya-kiya.mp3",
    duration: 314,
  },
];

const seedSongs = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		// Clear existing songs
		await Song.deleteMany({});

		// Insert new songs
		await Song.insertMany(songs);

		console.log("Songs seeded successfully!");
	} catch (error) {
		console.error("Error seeding songs:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedSongs();