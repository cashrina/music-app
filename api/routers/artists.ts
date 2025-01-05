import express from 'express';
import mongoose from "mongoose";
import { imagesUpload } from "../multer";
import { IArtist } from "../types";
import Artist from "../models/Artist";

const artistRouter = express.Router();

artistRouter.get('/', async (req: any, res: any, next: any) => {
    try {
        const artists = await Artist.find();
        return res.send(artists);
    } catch (e) {
        next(e);
    }
});

artistRouter.post('/', imagesUpload.single('image'), async (req: any, res: any, next: any) => {
    try {
        const artistMutation: IArtist = {
            name: req.body.name,
            image: req.file ? req.file.filename : null,
            info: req.body.info,
        }

        const artist = new Artist(artistMutation);
        await artist.save();
        return res.send(artist);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        next(e);
    }
});

export default artistRouter;




