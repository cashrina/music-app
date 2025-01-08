import express from "express";
import mongoose from "mongoose";
import {ITrack} from "../types";
import Album from "../models/Album";
import Track from "../models/Track";

const trackRouter = express.Router();

trackRouter.get('/', async (req, res, next) => {
    try {
        const { album, artist } = req.query;
        let tracks;

        if (artist) {
            const albums = await Album.find({ artist });
            const albumId = albums.map(album => album._id);
            tracks = await Track.find({ album: { $in: albumId } });
        } else if (album) {
            tracks = await Track.find({ album });
        } else {
            tracks = await Track.find();
        }

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