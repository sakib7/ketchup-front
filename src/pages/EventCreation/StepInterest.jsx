import { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Chip, Stack } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PetsIcon from '@mui/icons-material/Pets';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import axiosInstance from '../../components/auth/axiosInstance';

export default function StepInterest({ interest, setInterest }) {
  // const [interests, setInterests] = useState([
  //   {
  //     label: "Food",
  //     icon: <RestaurantIcon />
  //   },
  //   {
  //     label: "Pets",
  //     icon: <PetsIcon />
  //   },
  //   {
  //     label: "Music",
  //     icon: <MusicNoteIcon />
  //   },
  //   {
  //     label: "Theater",
  //     icon: <TheaterComedyIcon />
  //   }
  // ])

  const [interestOptions, setInterestOption] = useState([])
  useEffect(() => {
    fetchInterests();
  }, [])

  const handleClick = (value) => {
    setInterest(value)
  }

  const fetchInterests = async () => {
    try {
      const response = await axiosInstance.get(`/interests`);
      if (response.status === 200) {
        setInterestOption(response.data)
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          mb: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Select your interest
        </Typography>
        <Stack
          direction="row"
          useFlexGap
          flexWrap="wrap"
          spacing={2}
          justifyContent='center'
          sx={{ mt: 3 }}
        >
          {
            interestOptions.map(({ id, name }, index) => (
              <Chip
                key={index}
                // icon={icon}
                label={
                  <Typography variant="body1" sx={{ ml: 1 }} >
                    {name}
                  </Typography>
                }
                variant={interest?.name === name ? "filled" : "outlined"}
                color={interest?.name === name ? "primary" : "info"}
                sx={{ minWidth: "130px", minHeight: "50px", ml: 2, marginBottom: 2 }}
                onClick={() => { handleClick({ id, name }) }} />
            ))
          }
        </Stack>




      </Box>
    </Container>
  );
}