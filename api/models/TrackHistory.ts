import mongoose, {Types} from "mongoose";
import User from "./User";
import Track from "./Track";

const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
   user: {
       type: Schema.Types.ObjectId,
       ref: 'User',
       validate: async (value:Types.ObjectId) => {
           const user = await User.findById(value);
           return Boolean(user);
       },
       message:'Track doesnt exist const',
       required:true
   },
    track: {
       type: Schema.Types.ObjectId,
        ref: 'Track',
        validate: async (value:Types.ObjectId) => {
           const track = await Track.findById(value);
           return Boolean(track);
        },
        message:'Track doesnt exist const',
        required:true
    },
    datetime: {
       type: Date,
        required: true,
    },
});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);
export default TrackHistory;