import {Model} from "mongoose";

export interface IArtist {
    name: string;
    image: string | null;
    info: string | null;
}

export interface IAlbum {
    name: string;
    artist: string;
    year: number;
    image: string | null;
}
export interface ITrack {
    name: string;
    album: string;
    duration: string;
}

export interface UserFields {
    username: string;
    password: string;
    token: string;
}

export interface UsersMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

export type UsersModel = Model<UserFields, {}, UsersMethods>
