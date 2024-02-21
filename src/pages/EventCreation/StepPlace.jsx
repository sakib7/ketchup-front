import { useEffect, useState } from 'react';
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
import PlaceDetails from './PlaceDetails';
import axiosInstance from '../../components/auth/axiosInstance';

export default function StepPlace({
  interest: selectedInterest,
  place: selectedPlace,
  setPlace
}) {
  const [openDetails, setOpenDetails] = useState(false)
  const [clickedPlace, setClickedPlace] = useState({})
  const [places, setPlaces] = useState([
    // {
    //   name: 'Turku Bistro',
    //   place: 'Hämeenkatu 10, Turku',
    //   price: 25.99,
    //   discount: 10,
    // },
    // {
    //   name: 'Nordic Flavors',
    //   place: 'Myllynkatu 1, Raisio',
    //   price: 30.50,
    //   discount: 15,
    // },
    // {
    //   name: 'Majestic Grill',
    //   place: 'Rantatie 2, Kaarina',
    //   price: 28.75,
    //   discount: 12,
    // },
    // {
    //   name: 'Seafood Haven',
    //   place: 'Satamakatu 5, Naantali',
    //   price: 35.25,
    //   discount: 20,
    // },
    // {
    //   name: 'Green Garden Fusion',
    //   place: 'Hämeenkatu 30, Turku',
    //   price: 22.99,
    //   discount: 8,
    // },
  ]);

  const [selectedLabel, setLabel] = useState("")
  useEffect(() => {
    fetchPlaces()
  }, [])

  const fetchPlaces = async () => {
    try {
      const response = await axiosInstance.get(`/businesses?interests=${selectedInterest.id}`);
      if (response.status === 200) {
        setPlaces(response.data)
      }
    } catch (error) {
      console.error(error);
    }
  }

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

  const handPlaceDetails = (place) => {
    setClickedPlace(place);
    setOpenDetails(true);
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
                  background: place.id === selectedPlace?.id ? '#e0f7fa' : 'white',
                  border: place.id === selectedPlace?.id ? '2px solid #2196f3' : '2px solid transparent',
                  width: "95%", height: "100%", display: 'flex', flexDirection: 'column'
                }}
              >
                {/* <CardActionArea onClick={() => handleClick(place)} sx={{ margin: '0px' }}> */}
                <CardMedia
                  sx={{ height: 140 }}
                  image={`${place?.avatar}`}
                  title="green iguana"
                />
                <CardContent style={{ flex: '1' }}>
                  <Typography gutterBottom variant="h6" fontSize={18} component="div">
                    {place?.business_profile?.name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1" component="div" style={{ display: 'flex', alignItems: 'center' }}>
                    <PlaceRoundedIcon sx={{ mr: 1 }} />  {place?.business_profile?.address}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1" component="div" style={{ display: 'flex', alignItems: 'center' }}>
                    <EuroIcon sx={{ mr: 1 }} /> starts at {place?.business_profile?.starting_price}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1" component="div" style={{ display: 'flex', alignItems: 'center' }}>
                    <DiscountIcon sx={{ mr: 1 }} /> {place?.business_profile?.discount}% OFF
                  </Typography>
                </CardContent>
                <CardActions style={{
                  justifyContent: 'end'
                }}>
                  <Button onClick={() => handPlaceDetails(place)} size="small">Details</Button>
                </CardActions>

                {/* </CardActionArea> */}
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
      <PlaceDetails
        open={openDetails}
        place={clickedPlace}
        handleSelect={() => {
          setOpenDetails(false);
          setPlace(clickedPlace)
        }}
        handleClose={() => { setOpenDetails(false) }}
      />
    </Container>
  );
}