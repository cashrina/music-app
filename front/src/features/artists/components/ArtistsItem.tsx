import React from 'react';
import { apiUrl } from "../../../../globalConstants";
import NoPictureImage from "../../../assets/noPicture.png";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

interface Props {
  id: string;
  name: string;
  image?: string | null | undefined;
  info: string;
}

const ArtistsItem: React.FC<Props> = ({ id, name, image, info }) => {
  const productsImage: string = image ? apiUrl + "/" + image : NoPictureImage;

  return (
    <Grid container justifyContent="center" sx={{ padding: '20px' }}>
      <Grid
        container
        item
        spacing={3}
        justifyContent="center"
        sx={{ width: '100%', maxWidth: '1200px' }}
      >
        <Grid item xs={12} sm={9} md={4} lg={12}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <CardHeader title={name} />
            <CardMedia
              component="img"
              image={productsImage}
              alt={name}
              sx={{
                height: 180,
                objectFit: "cover",
              }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {info}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/artists/${id}`}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ArtistsItem;



