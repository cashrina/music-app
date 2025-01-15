import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection("artists");
        await db.dropCollection("albums");
        await db.dropCollection("tracks");
    } catch (e) {
        console.error(e, "my error");
    }

    const [LilPeep, Ghostemane] = await Artist.create(
        {
            name: "Lil Peep",
            image: "fixtures/Lil-Peep.png",
            info: "Lil Peep (Gustav Elijah Åhr, 1996–2017) was a genre-defying rapper, singer, and songwriter who blended emo, punk, and hip-hop into a unique and deeply personal sound",
        },
        {
            name: "Ghostemane",
            image: "fixtures/Ghostemane.png",
            info: "Ghostemane (Eric Whitney, born 1991) is an American rapper, singer, and producer known for blending heavy metal, industrial, and rap into a dark, aggressive, and experimental sound",
        }
    );

    const [album1_Lil_Peep, album2_Lil_Peep, album3_Ghostemane, album4_Ghostemane] = await Album.create(
        {
            name: "Come Over When You're Sober, Pt. 1",
            artist: LilPeep._id,
            year: 2017,
            image: "fixtures/Lil_album_1.png",
        },
        {
            name: "Come Over When You're Sober, Pt. 2",
            artist: LilPeep._id,
            year: 2018,
            image: "fixtures/Lil_album_2.png",
        },
        {
            name: "N/O/I/S/E",
            artist: Ghostemane._id,
            year: 2018,
            image: "fixtures/NOISE.png",
        },
        {
            name: "ANTI-ICON",
            artist: Ghostemane._id,
            year: 2020,
            image: "fixtures/ANTIICON.png",
        }
    );

    await Track.create(
        {
            name: "Benz Truck",
            album: album1_Lil_Peep._id,
            duration: "2:40",
            position: 1,
        },
        {
            name: "Save That Shit",
            album: album1_Lil_Peep._id,
            duration: "3:52",
            position: 2,
        },
        {
            name: "Awful Things",
            album: album1_Lil_Peep._id,
            duration: "3:34",
            position: 3,
        },
        {
            name: "The Brightside",
            album: album1_Lil_Peep._id,
            duration: "3:36",
            position: 4,
        },
        {
            name: "Problems",
            album: album1_Lil_Peep._id,
            duration: "3:30",
            position: 5,
        },


        {
            name: "Cry Alone",
            album: album2_Lil_Peep._id,
            duration: "2:47",
            position: 1,
        },
        {
            name: "Leanin'",
            album: album2_Lil_Peep._id,
            duration: "3:25",
            position: 2,
        },
        {
            name: "16 Lines",
            album: album2_Lil_Peep._id,
            duration: "4:05",
            position: 3,
        },
        {
            name: "Life is Beautiful",
            album: album2_Lil_Peep._id,
            duration: "3:27",
            position: 4,
        },
        {
            name: "Falling Down",
            album: album2_Lil_Peep._id,
            duration: "3:18",
            position: 5,
        },


        {
            name: "Nihil",
            album: album3_Ghostemane._id,
            duration: "2:16",
            position: 1,
        },
        {
            name: "Flesh",
            album: album3_Ghostemane._id,
            duration: "3:32",
            position: 2,
        },
        {
            name: "Bonebreaker",
            album: album3_Ghostemane._id,
            duration: "3:01",
            position: 3,
        },
        {
            name: "Gatteka",
            album: album3_Ghostemane._id,
            duration: "2:45",
            position: 4,
        },
        {
            name: "Vagabond",
            album: album3_Ghostemane._id,
            duration: "3:20",
            position: 5,
        },


        {
            name: "Lazaretto",
            album: album4_Ghostemane._id,
            duration: "3:18",
            position: 1,
        },
        {
            name: "AI",
            album: album4_Ghostemane._id,
            duration: "2:59",
            position: 2,
        },
        {
            name: "Fed Up",
            album: album4_Ghostemane._id,
            duration: "3:03",
            position: 3,
        },
        {
            name: "Hydrochloride",
            album: album4_Ghostemane._id,
            duration: "2:40",
            position: 4,
        },
        {
            name: "Calamity",
            album: album4_Ghostemane._id,
            duration: "3:45",
            position: 5,
        }
    );

    await db.close();
};

run().catch(console.error);
