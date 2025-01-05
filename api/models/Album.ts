import mongoose, {Schema, Types} from 'mongoose';
import Artist from "./Artist";

const AlbumSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        validate: async (value: Types.ObjectId) => {
            const album = await  Artist.findById(value);
            return Boolean(album);
        },
        message: 'Artist doesnt exist const',
        required: true,
    },
    year: {
        type: Date,
        required: true,
    },
    image: String,
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album;