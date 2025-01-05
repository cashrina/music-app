import mongoose, {Types} from "mongoose";
import Album from "../models/Album";

const Schema = mongoose.Schema;

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
        message: 'Track doesnt exist const',
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    position: {
        type: Number,
    }
});

const Track = mongoose.model("Track", TrackSchema);
export default Track;