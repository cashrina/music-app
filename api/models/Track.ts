import mongoose, { Types } from "mongoose";
import Album from "../models/Album";

const Schema = mongoose.Schema;

const CounterSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    seq: {
        type: Number,
        default: 0,
    },
});

const Counter = mongoose.model("Counter", CounterSchema);

const TrackSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: "Album",
        validate: async (value: Types.ObjectId) => {
            const track = await Album.findById(value);
            return Boolean(track);
        },
        message: "Track doesn't exist",
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    position: {
        type: Number,
    },
    trackNumber: {
        type: Number,
        unique: true,
    },
});

TrackSchema.pre("save", async function (next) {
    const track = this;

    if (track.trackNumber) return next();

    try {
        const counter = await Counter.findByIdAndUpdate(
            { _id: "trackNumber" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        track.trackNumber = counter?.seq;
        next();
    } catch (error) {
        next(error as mongoose.CallbackError);
    }
});


const Track = mongoose.model("Track", TrackSchema);
export default Track;
