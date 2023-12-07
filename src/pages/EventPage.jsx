import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button, Avatar, Container, CardMedia } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import ClassIcon from '@mui/icons-material/Class';
import dayjs from 'dayjs';
import axiosInstance from '../components/auth/axiosInstance';

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // const getEventById = async () => {
    //   setEvent({
    //     id: eventId,
    //     name: 'Event Name',
    //     host: 'Host Name',
    //     date: new Date(), // Replace with the actual date
    //     address: 'Event Address',
    //     category: 'Event Category',
    //     description: 'Join us at Kraken Helsinki for an unforgettable New Years Eve the 31st of December! ✨ Karaoke will be on from 14:00 - 22:00best hits and beats from the earlier decades til now.Showtime 22:00-04:00! 📀', // Replace with the actual description
    //   });
    // };
    const getEvent = async () => {
      try {
        const response = await axiosInstance.get(`/ketchups/${eventId}`);
        if (response.status === 200) {
          console.log(response.data);
          setEvent(response.data)
        }
      } catch (error) {
        console.error(error);
      }
    }
    getEvent();
  }, []);

  if (!event) {
    // Loading state or handle the absence of event data
    return <div>Loading...</div>;
  }



  const formattedDate = dayjs(event.datetime).format('dddd, MMMM D, YYYY [at] h:mm A');

  return (
    <Container maxWidth="md">
      <Card sx={{ mt: 3 }}>
        <Container disableGutters>
          <CardMedia sx={{ height: 200, pl: 5 }} image={`https://source.unsplash.com/random?wallpapers&${event.id}`} title="Event Image" />
          <Typography variant="h5" sx={{ mt: 4, mx: 2 }} >
            {event.name}
          </Typography>
        </Container>
        <CardContent style={{ textAlign: 'start' }}>
          <Typography variant="subtitle1" component="div" style={{ display: 'flex', alignItems: 'center' }} >
            <PersonIcon sx={{ mr: 1 }} /> Organizer: {event?.user?.firstname}
          </Typography>
          <Typography variant="subtitle1" component="div" sx={{ mt: 1 }} style={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeRoundedIcon sx={{ mr: 1 }} /> {formattedDate}
          </Typography>
          <Typography variant="subtitle1" component="div" sx={{ mt: 1 }} style={{ display: 'flex', alignItems: 'center' }}>
            <PlaceRoundedIcon sx={{ mr: 1 }} /> Place: {event.address}
          </Typography>
          <Typography variant="subtitle1" component="div" sx={{ mt: 1 }} style={{ display: 'flex', alignItems: 'center' }}>
            <ClassIcon sx={{ mr: 1 }} /> Type: {event.category}
          </Typography>

          <Typography whiteSpace="pre-line" sx={{ mt: 3 }} paragraph>{event.description}</Typography>
          <Button variant="contained" color="error" onClick={() => { }}>
            Join
          </Button>
        </CardContent>
      </Card>
    </Container>
    // <Grid container justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
    //   <Grid item>

    //   </Grid>
    // </Grid>
  );
};

export default EventDetails;
