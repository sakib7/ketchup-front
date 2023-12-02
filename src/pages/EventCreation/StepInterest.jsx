import { useState } from 'react';
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

export default function StepInterest({ interest, setInterest }) {
  const [interests, setInterests] = useState([
    {
      label: "Food",
      icon: <RestaurantIcon />
    },
    {
      label: "Pets",
      icon: <PetsIcon />
    },
    {
      label: "Music",
      icon: <MusicNoteIcon />
    },
    {
      label: "Theater",
      icon: <TheaterComedyIcon />
    }
  ])

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
    setInterest(value)
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
          sx={{ mt: 3 }}
        >
          {
            interests.map(({ label, icon }, index) => (
              <Chip
                key={index}
                icon={icon}
                label={
                  <Typography variant="body1" sx={{ ml: 1 }} >
                    {label}
                  </Typography>
                }
                variant={interest === label ? "filled" : "outlined"}
                color={interest === label ? "primary" : "info"}
                sx={{ minWidth: "130px", minHeight: "50px", ml: 2, marginBottom: 2 }}
                onClick={() => { handleClick(label) }} />
            ))
          }
        </Stack>




      </Box>
    </Container>
  );
}