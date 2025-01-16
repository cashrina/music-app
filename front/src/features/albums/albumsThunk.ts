import { createAsyncThunk } from '@reduxjs/toolkit';
import { Albums } from '../../../types';
import axiosApi from '../../../axiosApi.ts';


export const fetchAlbumsByArtist = createAsyncThunk<Albums[], string | undefined>(
  "albums/fetchAlbumsByArtist",
  async (artistId) => {
    const params = artistId ? { artists: artistId } : undefined;
    const albumsResponse = await axiosApi.get<Albums[]>("/albums", { params });
    return albumsResponse.data || [];
  }
);