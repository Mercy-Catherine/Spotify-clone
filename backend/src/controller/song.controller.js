import {Song} from "../models/song.model.js";
export const getAllSongs=async (req,res,next)=>{
    try {
        const songs=await Song.find().sort({createddAt: -1});//-1 = descending ->new to old
        res.json(songs);
    } catch (error) {
        next(error);
    }
};

export const getFeaturedSongs=async(req,res,next)=>{
    try {
        const songs=await Song.aggregate([
            {
                $sample:{size:6}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1,
                },
            },
        ]);//fetch 6 random songs using MongoDb aaggregation pipeline
        res.json(songs);

    } catch (error) {
        next(error);
    }
};

export const getMadeForYouSongs=async(req,res,next)=>{
    try {
        const songs=await Song.aggregate([
            {
                $sample:{size:4}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1,
                },
            },
        ]);//fetch 4 random songs using MongoDb aaggregation pipeline
        res.json(songs);

    } catch (error) {
        next(error);
    }
};

export const getTrendingSongs=async(req,res,next)=>{
    try {
        const songs=await Song.aggregate([
            {
                $sample:{size:6}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1,
                },
            },
        ]);//fetch 6 random songs using MongoDb aaggregation pipeline
        res.json(songs);

    } catch (error) {
        next(error);
    }
};

