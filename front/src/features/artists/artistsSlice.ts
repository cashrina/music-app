import { Artists } from '../../../types';
import { RootState } from '../../app/store'
import { createSlice } from '@reduxjs/toolkit';
import { fetchArtists } from './artistsThunk.ts';

interface IArtistsState {
  items: Artists[];
  fetchLoading: boolean;
}

const initialState: IArtistsState = {
  items:[],
  fetchLoading: false,
}

export const selectArtistsItems = (state: RootState) =>
state.artists.items;
export const selectFetchArtistsLoading = (state: RootState) =>
  state.artists.fetchLoading;

export const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state)=> {
        state.fetchLoading = true;
      })
      .addCase(fetchArtists.fulfilled, (state, {payload: artists}) => {
        state.fetchLoading = false;
        state.items = artists;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.fetchLoading = false;
      })
  }});

export const artistsReducer = artistsSlice.reducer;