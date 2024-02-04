import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Card, CardActionArea, Chip, Stack } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import DiscountIcon from '@mui/icons-material/Discount';
import EuroIcon from '@mui/icons-material/Euro';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';

export default function StepPlace({ place: selectedPlace, setPlace }) {
  const [places, setPlaces] = useState([
    {
      name: 'Turku Bistro',
      place: 'Hämeenkatu 10, Turku',
      price: 25.99,
      discount: 10,
    },
    {
      name: 'Nordic Flavors',
      place: 'Myllynkatu 1, Raisio',
      price: 30.50,
      discount: 15,
    },
    {
      name: 'Majestic Grill',
      place: 'Rantatie 2, Kaarina',
      price: 28.75,
      discount: 12,
    },
    {
      name: 'Seafood Haven',
      place: 'Satamakatu 5, Naantali',
      price: 35.25,
      discount: 20,
    },
    {
      name: 'Green Garden Fusion',
      place: 'Hämeenkatu 30, Turku',
      price: 22.99,
      discount: 8,
    },
  ]);

  const [selectedLabel, setLabel] = useState("")
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const handleClick = (value) => {
    setPlace(value)
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          mb: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="p" variant="h5">
          Great deals
        </Typography>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          {places.map((place, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
              <Card
                sx={{
                  background: place.name === selectedPlace?.name ? '#e0f7fa' : 'white',
                  border: place.name === selectedPlace?.name ? '2px solid #2196f3' : '2px solid transparent',
                  width: "95%", height: "100%", display: 'flex', flexDirection: 'column'
                }}
              >
                <CardActionArea onClick={() => handleClick(place)} sx={{ margin: '0px' }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={`https://source.unsplash.com/random?wallpapers&${index}`}
                    title="green iguana"
                  />
                  <CardContent style={{ flex: '1' }}>
                    <Typography gutterBottom variant="h6" fontSize={18} component="div">
                      {place?.name}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" component="div" style={{ display: 'flex', alignItems: 'center' }}>
                      <PlaceRoundedIcon sx={{ mr: 1 }} />  {place?.place}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" component="div" style={{ display: 'flex', alignItems: 'center' }}>
                      <EuroIcon sx={{ mr: 1 }} /> starts at {place?.price}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" component="div" style={{ display: 'flex', alignItems: 'center' }}>
                      <DiscountIcon sx={{ mr: 1 }} /> {place?.discount}% OFF
                    </Typography>
                  </CardContent>

                </CardActionArea>
              </Card >
            </Grid>
          ))}
        </Grid>
        <Stack
          direction="row"
          useFlexGap
          flexWrap="wrap"
          spacing={2}
          sx={{ mt: 3 }}
        >

        </Stack>




      </Box>
    </Container>
  );
}