import express from "express";
import mongoose from "mongoose";
import {ITrack} from "../types";
import Album from "../models/Album";
import Track from "../models/Track";

const trackRouter = express.Router();

trackRouter.get('/', async (req, res, next) => {
    try {
        const {album, artist}  = req.query;
        let filter = {};
        if (album) {
            filter = {album: album};
        } else if (artist) {
            const albumsList = await Album.find({artist});
            const albumsIdArray = albumsList.map(album => album._id);
            filter = {album: {$in: albumsIdArray}};
        }

        const tracks = await Track.find(filter).populate({
            path:'album',
            populate: {
                path: 'artist',
                model: 'Artist'
            }
        });
        res.send(tracks);
    } catch (error) {
        next(error);
    }
});

trackRouter.post('/', async (req, res, next) => {
    try {
        const tracks: ITrack = {
            name: req.body.name,
            album: req.body.album,
            duration: req.body.duration,
        };

        const track = new Track(tracks);
        await track.save();
        res.send(track);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error);
        } else {
            next(error);
        }
    }
});

export default trackRouter;