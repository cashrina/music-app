export interface IArtist {
    name: string;
    image: string | null;
    info: string | null;
}

export interface IAlbum {
    name: string;
    artist: string;
    year: Date;
    image: string | null;
}
export interface ITrack {
    name: string;
    album: string;
    duration: string;
}
