import express from "express";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import {IAlbum} from "../types";
import Album from "../models/Album";

const albumRouter = express.Router();

albumRouter.get('/', async (req:any, res:any, next) => {
    try {
        const { artist } = req.query;

        if (artist) {
            const albums = await Album.find({ artist });
            return res.send(albums);
        }

        const albums = await Album.find();
        return res.send(albums);
    } catch (error) {
        next(error);
    }
});

albumRouter.get('/:id', async (req: any, res: any, next) => {
    try {
        const album = await Album.findById(req.params.id).populate('artist');

        if (album === null) {
            return res.status(404).send({ error: 'Album not found' });
        }

        return res.send(album);
    } catch (error) {
        next(error);
    }
});


albumRouter.post('/',imagesUpload.single('image'), async (req:any, res:any, next) => {
    try {
        const albums: IAlbum = {
            name: req.body.name,
            artist: req.body.artist,
            year: req.body.year,
            image: req.file ? req.file.filename : null,
        };
        const album = new Album(albums);
        await album.save();
        return res.send(album);

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }
        return next(error);
    }
});



export default albumRouter;

