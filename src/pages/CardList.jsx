import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EventCard from '../components/EventCard';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Link from '@mui/material/Link';
import axiosInstance from '../components/auth/axiosInstance';
import { useAuth } from '../components/auth/AuthContext';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const events = [
  {
    "id": 3,
    "title": "Cinema Night: Join Me Under the Stars!",
    "host": "Cinephile Club",
    "time": "Fri, Feb 10 · 8:00 PM EST",
    "place": "Metroplex Cinemas"
  },

  {
    "id": 4,
    "title": "Comedy Extravaganza: You're Invited!",
    "host": "Laugh Riot Productions",
    "time": "Sat, Mar 15 · 9:00 PM CST",
    "place": "The Comedy Lounge"
  },

  {
    "id": 5,
    "title": "Jazz Serenade: Join Me for a Musical Night!",
    "host": "Melodic Harmony Productions",
    "time": "Sun, Apr 22 · 7:30 PM MST",
    "place": "Harmony Hall"
  },

  {
    "id": 6,
    "title": "Art and History Exploration: Enthusiasts Wanted!",
    "host": "Art & History Society",
    "time": "Sat, May 30 · 11:00 AM PST",
    "place": "City Museum of Art"
  },

  {
    "id": 7,
    "title": "Culinary Journey: Foodies Wanted!",
    "host": "Gourmet Delights Association",
    "time": "Sat, Jun 5 · 12:00 PM EST",
    "place": "Parkside Plaza"
  },

  {
    "id": 8,
    "title": "Dance the Night Away: Your VIP Invitation!",
    "host": "Bass Beats Productions",
    "time": "Fri, Jul 14 · 10:00 PM CST",
    "place": "Rave Warehouse"
  },

  {
    "id": 9,
    "title": "Tech Expo: Tech Enthusiasts, Unite!",
    "host": "Innovation Hub",
    "time": "Sat, Aug 20 · 2:00 PM PST",
    "place": "Tech Center"
  },

  {
    "id": 10,
    "title": "Classical Music Soiree: Your Exclusive Invitation!",
    "host": "Symphony Society",
    "time": "Sun, Sep 8 · 6:30 PM MST",
    "place": "Grand Opera House"
  },

  {
    "id": 11,
    "title": "Geek Out: Calling All Geeks!",
    "host": "Geek Culture Alliance",
    "time": "Sat, Oct 3 · 11:00 AM EST",
    "place": "Convention Center"
  },

  {
    "id": 12,
    "title": "Outdoor Movie Night: Movie Buffs, RSVP Now!",
    "host": "Film Buffs Community",
    "time": "Fri, Nov 12 · 7:00 PM CST",
    "place": "Lakeside Park"
  }
]

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function CardList({ myEvents = false }) {
  const { userData, token } = useAuth();

  const [events, setEvents] = useState([]);
  useEffect(() => {
    getEvents()
  }, [])

  const getEvents = async () => {
    try {
      const response = await axiosInstance.get('/ketchups');
      if (response.status === 200) {
        console.log(response.data, userData);
        if (token) {
          setEvents(response.data.filter((e) =>
            myEvents ?
              e.user.email === userData.email : e.user.email !== userData.email)
          )
        } else {
          setEvents(response.data)
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  return (

    <main>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: 'background.red',
          pt: 0,
          pb: 6,
          // display: 'none'
        }}
      >
        <Container maxWidth="lg" >
          {/* <Typography
            component="h1"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Welcome to Ketch-Up
          </Typography> */}
          <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{ mt: 3 }}>
            {
              myEvents ?
                'Crafting Memorable Moments: Your Personalized KetchUps Await! 🎉✨' :
                'Welcome to KetchUp - where connections come to life, and local businesses thrive! 🚀'
            }

          </Typography>
          <Stack
            sx={{ pt: 3 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Link color="inherit" underline="none" component={RouterLink} to="/create-event">
              <Button variant="contained">Create a Ketch-Up</Button>
            </Link>
            {/* <Button variant="outlined">Secondary action</Button> */}
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 3 }} maxWidth="lg">
        {/* End hero unit */}
        <Grid container spacing={2}>
          {events.map((event) => (
            <Grid item key={event.id} xs={12} sm={6} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
              <EventCard event={event} myEvent={myEvents} fetch={getEvents} />
              {/* <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card> */}
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}