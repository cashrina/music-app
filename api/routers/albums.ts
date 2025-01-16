import express from "express";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import {IAlbum} from "../types";
import Album from "../models/Album";

const albumRouter = express.Router();

albumRouter.get('/', async (req, res, next) => {
    try {
        const { artist } = req.query;
        let albums;

        if (artist) {
            albums = await Album.find({ artist }).sort({ year: -1 });
        } else {
            albums = await Album.find().sort({ year: -1 });
        }

        res.send(albums);
    } catch (error) {
        next(error);
    }
});

albumRouter.get('/:id', async (req, res, next) => {
    try {
        const albums = await Album.findById(req.params.id).populate('artist');

        if (albums === null) {
            res.status(404).send({ error: 'Album not found' });
        }
        res.send(albums);
        return;
    } catch (error) {
        next(error);
    }
});

albumRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const albums: IAlbum = {
            name: req.body.name,
            artist: req.body.artist,
            year: req.body.year,
            image: req.file ? req.file.filename : null,
        };
        const album = new Album(albums);
        await album.save();
        res.send(album);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error);
        } else {
            next(error);
        }
    }
});

export default albumRouter;

