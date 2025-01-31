import express from 'express';
import * as mongoose from 'mongoose';
import artistRouter from "./routers/artists";
import config from "./config";
import albumRouter from "./routers/albums";
import trackRouter from "./routers/tracks";
import userRouter from "./routers/users";
import track_historyRoute from "./routers/track_history";
import cors from "cors";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/artists', artistRouter);
app.use('/albums', albumRouter);
app.use('/tracks', trackRouter);
app.use('/users', userRouter);
app.use('/track_history', track_historyRoute);

const run = async () => {
    await mongoose.connect(config.db);
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    });
    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);