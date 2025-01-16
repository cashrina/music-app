import { Grid, Typography, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectArtistsItems, selectFetchArtistsLoading } from '../artistsSlice.ts';
import { fetchArtists } from '../artistsThunk.ts';
import ArtistsItem from './ArtistsItem.tsx';
import { useEffect } from 'react';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtistsItems);
  const isFetchingArtistsLoading = useAppSelector(selectFetchArtistsLoading);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={4} sx={{ padding: 2 }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ marginBottom: 4 }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ textAlign: 'center', mt: 6 }}
        >
          Artists
        </Typography>
      </Grid>

      <Grid container spacing={3}>
        {isFetchingArtistsLoading ? (
          <Grid item xs={12} display="flex" justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : artists.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center">
              No artists yet
            </Typography>
          </Grid>
        ) : (
          artists.map((artist) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={artist._id}>
              <ArtistsItem
                id={artist._id}
                name={artist.name}
                image={artist.image}
                info={artist.info}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Grid>
  );
};

export default Artists;

