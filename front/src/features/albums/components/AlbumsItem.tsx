import React from 'react';
import { Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Artists } from '../../../../types';
import { apiUrl } from '../../../../globalConstants.ts';
import NoPictureImage from '../../../assets/noPicture.png';

interface Album {
  id: string;
  name: string;
  year: number;
  image?: string | null | undefined;
}

interface Props {
  artists: Artists;
  albums: Album[];
}

const AlbumsItem: React.FC<Props> = ({ artists, albums }) => {
  return (
    <Grid container justifyContent="center" sx={{ padding: '20px' }}>
      <Grid item xs={12} sx={{ marginBottom: '20px' }}>
        <Typography variant="h4" textAlign="center">
          {artists.name}
        </Typography>
      </Grid>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ width: '100%', maxWidth: '1200px' }}
      >
        {albums.map((album) => {
          const albumImage: string = album.image ? apiUrl + "/" + album.image : NoPictureImage;

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={album.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <CardHeader title={album.name} />
                <CardMedia
                  component="img"
                  image={albumImage}
                  alt={album.name}
                  sx={{
                    height: 180,
                    objectFit: "cover",
                  }}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Release Year: {album.year}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/albums/${album.id}`}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default AlbumsItem;