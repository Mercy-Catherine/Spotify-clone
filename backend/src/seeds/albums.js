import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing data
    await Album.deleteMany({});
    await Song.deleteMany({});

    // Insert songs
    const createdSongs = await Song.insertMany([
      {
        title: "Aasa Orave",
        artist: "Sean Roldan",
        imageUrl: "/cover-images/aasa-orave.jpg",
        audioUrl: "/songs/aasa-orave.mp3",
        duration: 226,
        plays: Math.floor(Math.random() * 5000),
      },
      {
        title: "Adigaa",
        artist: "Karthik",
        imageUrl: "/cover-images/adigaa.jpg",
        audioUrl: "/songs/adigaa.mp3",
        duration: 210,
        plays: Math.floor(Math.random() * 5000),
      },
      {
        title: "Innum Ennum",
        artist: "DexterDuke, Nevil",
        imageUrl: "/cover-images/innum-ennum.jpg",
        audioUrl: "/songs/innum-ennum.mp3",
        duration: 220,
        plays: Math.floor(Math.random() * 5000),
      },
      {
        title: "Kannoramaai",
        artist: "Pogan, Ankith Jain",
        imageUrl: "/cover-images/kannoramaai.jpg",
        audioUrl: "/songs/kannoramaai.mp3",
        duration: 225,
        plays: Math.floor(Math.random() * 5000),
      },
      {
        title: "Let Her Go",
        artist: "Passenger",
        imageUrl: "/cover-images/let-her-go.jpg",
        audioUrl: "/songs/let-her-go.mp3",
        duration: 252,
        plays: Math.floor(Math.random() * 5000),
      },
      {
        title: "Muththa Mazhai",
        artist: "Chinmayi, Siva Ananth",
        imageUrl: "/cover-images/muththa-mazhai.jpg",
        audioUrl: "/songs/muththa-mazhai.mp3",
        duration: 240,
        plays: Math.floor(Math.random() * 5000),
      },
      {
        title: "Rewrite The Stars",
        artist: "Zac Efron, Zendaya",
        imageUrl: "/cover-images/rewrite-the-stars.jpg",
        audioUrl: "/songs/rewrite-the-stars.mp3",
        duration: 217,
        plays: Math.floor(Math.random() * 5000),
      },
      {
        title: "Sunshine in the Rain",
        artist: "Shania Yan",
        imageUrl: "/cover-images/sunshine-in-the-rain.jpg",
        audioUrl: "/songs/sunshine-in-the-rain.mp3",
        duration: 217,
        plays: Math.floor(Math.random() * 5000),
      },
      {
        title: "TAQDEER",
        artist: "Rahul Raha",
        imageUrl: "/cover-images/taqdeer.jpg",
        audioUrl: "/songs/taqdeer.mp3",
        duration: 172,
        plays: Math.floor(Math.random() * 5000),
      },
      {
        title: "Tere Bina",
        artist: "A.R. Rahman, Chinmayi",
        imageUrl: "/cover-images/tere-bina.jpg",
        audioUrl: "/songs/tere-bina.mp3",
        duration: 309,
        plays: Math.floor(Math.random() * 5000),
      },
      {
        title: "Unnai Kaanadhu Naan",
        artist: "Shankar Ehsaan Loy",
        imageUrl: "/cover-images/unnai-kaanadhu-naan.jpg",
        audioUrl: "/songs/unnai-kaanadhu-naan.mp3",
        duration: 337,
        plays: Math.floor(Math.random() * 5000),
      },
      {
        title: "Ye Tune Kya Kiya",
        artist: "Pritam, Javed Bashir",
        imageUrl: "/cover-images/ye-tune-kya-kiya.jpg",
        audioUrl: "/songs/ye-tune-kya-kiya.mp3",
        duration: 314,
        plays: Math.floor(Math.random() * 5000),
      },
    ]);

    // Create albums
    const albums = [
      {
        title: "Melodic Moments",
        artist: "Various Artists",
        imageUrl: "/albums/melodic-moments.jpg",
        releaseYear: 2024,
        songs: createdSongs.slice(0, 4).map((song) => song._id),
      },
      {
        title: "Rainy Day Vibes",
        artist: "Various Artists",
        imageUrl: "/albums/rainy-day-vibes.jpg",
        releaseYear: 2024,
        songs: createdSongs.slice(4, 8).map((song) => song._id),
      },
      {
        title: "Bollywood Nostalgia",
        artist: "Various Artists",
        imageUrl: "/albums/bollywood-nostalgia.jpg",
        releaseYear: 2024,
        songs: createdSongs.slice(8, 12).map((song) => song._id),
      },
    ];

    const createdAlbums = await Album.insertMany(albums);

    // Link albumId to songs
    for (let i = 0; i < createdAlbums.length; i++) {
      const album = createdAlbums[i];
      const songIds = albums[i].songs;

      await Song.updateMany(
        { _id: { $in: songIds } },
        { albumId: album._id }
      );
    }

    console.log("Music database seeded successfully!");
  } catch (error) {
    console.error("Error seeding music database:", error);
  } finally {
    await mongoose.disconnect();
  }
};

seedDatabase();
