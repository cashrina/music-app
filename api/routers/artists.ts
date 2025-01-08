import express from 'express';
import mongoose from "mongoose";
import { imagesUpload } from "../multer";
import { IArtist } from "../types";
import Artist from "../models/Artist";

const artistRouter = express.Router();

artistRouter.get('/', async (req, res, next) => {
    try {
        const artists = await Artist.find();
        res.send(artists);
        return;
    } catch (e) {
        next(e);
    }
});

artistRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const artistMutation: IArtist = {
            name: req.body.name,
            image: req.file ? req.file.filename : null,
            info: req.body.info,
        };

        const artist = new Artist(artistMutation);
        await artist.save();
        res.send(artist);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).send(e);
        } else {
            next(e);
        }
    }
});

export default artistRouter;




