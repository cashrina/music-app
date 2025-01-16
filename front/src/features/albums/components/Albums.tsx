import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectAlbumsItems, selectFetchAlbumsLoading } from '../albumsSlice.ts';
import { useEffect } from 'react';
import { fetchAlbumsByArtist } from '../albumsThunk.ts';
import { CircularProgress, Container, Typography } from '@mui/material';
import AlbumsItem from './AlbumsItem.tsx';
import { useParams } from 'react-router-dom';

const Albums = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbumsItems);
  const isFetchingAlbumsLoading = useAppSelector(selectFetchAlbumsLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbumsByArtist(id));
    }
  }, [dispatch, id]);

  const artistData = albums.length > 0 ? albums[0].artists : null;

  return (
    <Container sx={{ padding: '20px' }}>
      {artistData && (
        <Typography variant="h4" textAlign="center" sx={{ marginBottom: '20px' }}>
          {artistData.name}
        </Typography>
      )}

      {isFetchingAlbumsLoading && (
        <Typography textAlign="center" sx={{ marginBottom: '20px' }}>
          <CircularProgress />
        </Typography>
      )}

      {!isFetchingAlbumsLoading && albums.length > 0 && artistData && (
        <AlbumsItem
          artists={artistData}
          albums={albums.map((album) => ({
            id: album._id,
            name: album.name,
            year: album.year,
            image: album.image,
          }))}
        />
      )}

      {!isFetchingAlbumsLoading && albums.length === 0 && (
        <Typography variant="h6" textAlign="center">
          No albums found.
        </Typography>
      )}
    </Container>
  );
};

export default Albums;
