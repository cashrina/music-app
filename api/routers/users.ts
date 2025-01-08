import express from "express";
import User from "../models/User";
import {randomUUID} from "node:crypto";
import mongoose from "mongoose";

const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            token: randomUUID(),
        });
        user.generateToken();
        await user.save();
        res.send(user);
        return;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
           res.status(400).send(error);
        }
        next(error);
    }
});

userRouter.post('/session', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).send({ error: "Username and password are required" });
            return;
        }

        const user = await User.findOne({ username });

        if (!user) {
            res.status(404).send({ error: "User not found" });
            return;
        }

        const isMatch = await user.checkPassword(password);

        if (!isMatch) {
            res.status(400).send({ error: "Password is wrong" });
            return;
        }
        user.generateToken();
        await user.save();

        res.send(user);
    } catch (error) {
        next(error);
    }
});

export default userRouter;