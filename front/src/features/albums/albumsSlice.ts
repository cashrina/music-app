import { Albums } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store'
import { fetchAlbumsByArtist } from './albumsThunk.ts';

interface IAlbumsState {
  items: Albums[];
  fetchLoading: boolean;
}

const initialState: IAlbumsState ={
  items: [],
  fetchLoading: false,
}

export const selectAlbumsItems = (state:RootState) =>
  state.albums.items;
export const selectFetchAlbumsLoading = (state:RootState) =>
  state.albums.fetchLoading;

export const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAlbumsByArtist.pending, (state) => {
      state.fetchLoading = true;
    })
      .addCase(fetchAlbumsByArtist.fulfilled, (state, {payload: albums}) => {
        state.fetchLoading = false;
        state.items = albums;
      })
      .addCase(fetchAlbumsByArtist.rejected, (state)=> {
        state.fetchLoading = false
      })
  }
});

export const albumsReducer = albumsSlice.reducer;