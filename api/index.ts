import express from 'express';
import * as mongoose from 'mongoose';
import artistRouter from "./routers/artists";
import config from "./config";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use('/artists', artistRouter);


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