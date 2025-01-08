import express from 'express';
import mongoose from "mongoose";
import User from "../models/User";
import Track from "../models/Track";
import TrackHistory from "../models/TrackHistory";

const track_historyRoute = express.Router();

track_historyRoute.post('/', async (req, res, next) => {
    try {
        const headerValue = req.get('Authorization');
        if (!headerValue) {
            res.status(401).send({ error: 'Unauthorized: Authorization header is required' });
            return;
        }
        const [_bearer, token] = headerValue.split(' ');

        if (!token) {
            res.status(401).send({ error: 'Unauthorized: Token not found' });
            return;
        }

        const user = await User.findOne({ token });

        if (!user) {
            res.status(401).send({ error: 'Unauthorized: Invalid token' });
            return;
        }

        const { track } = req.body;
        if (!track) {
            res.status(400).send({ error: 'Bad Request: Track ID is required' });
            return;
        }

        const validTrack = await Track.findOne({ _id: track });
        if (!validTrack) {
            res.status(400).send({ error: 'Bad Request: Track ID is invalid' });
            return;
        }

        const trackHistory = new TrackHistory({
            user: user._id,
            track: track,
            datetime: new Date(),
        });

        await trackHistory.save();

        res.status(200).send(trackHistory);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send({ error: 'Validation Error', details: error.errors });
            return;
        }
        next(error);
    }
});

export default track_historyRoute;