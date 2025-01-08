import express from 'express';
import * as mongoose from 'mongoose';
import artistRouter from "./routers/artists";
import config from "./config";
import albumRouter from "./routers/albums";
import trackRouter from "./routers/tracks";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));

app.use('/artists', artistRouter);
app.use('/albums', albumRouter);
app.use('/tracks', trackRouter);


const run = async () => {
    await mongoose.connect(config.database);
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    });
    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);