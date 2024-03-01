import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button, Avatar, Container, CardMedia, Chip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import ClassIcon from '@mui/icons-material/Class';
import dayjs from 'dayjs';
import axiosInstance from '../components/auth/axiosInstance';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useAuth } from '../components/auth/AuthContext';
import parse from 'html-react-parser';

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const { token, userData } = useAuth()

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

    getEvent();
  }, []);

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

  if (!event) {
    // Loading state or handle the absence of event data
    return <div>Loading...</div>;
  }

  const joinRequest = async () => {
    const data = {
      event: eventId
    }
    try {
      const response = await axiosInstance.post(`/application`, data);
      if (response.status === 201) {
        console.log(response.data);
        getEvent();
        // setEvent(response.data)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const giveDecision = async (application_id, decision) => {
    const data = {
      id: application_id,
      status: decision
    }
    try {
      const response = await axiosInstance.post(`/decision`, data);
      if (response.status === 202) {
        console.log(response.data);
        getEvent();
        // setEvent(response.data)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const canJoin = () => {
    if (token) {
      if (userData.email === event.user.email || event.applications.some(i => i.user.email === userData.email))
        return false
      else
        return true
    } else {
      return false
    }
  }

  const canViewAttendee = () => {
    if (token) {
      if (userData.email === event.user.email)
        return true
      else if (event.applications.some(i => i.user.email === userData.email)) {
        const request = event.applications.find(i => i.user.email === userData.email)
        if (request.status === 'accepted') {
          return false
        }
      }

      else
        return false
    } else {
      return false
    }
  }

  const getAttendeeCount = () => {
    return event.applications.filter(i => i.status === 'accepted').length
  }

  const getJoinStatus = () => {
    if (!token) return false
    if (event.applications.some(i => i.user.email === userData.email)) {
      const request = event.applications.find(i => i.user.email === userData.email)
      if (request.status === 'pending') {
        return <Chip label="Request Pending" color="info" variant="filled" />
      } else if (request.status === 'accepted') {
        return <Chip label="Joined" color="success" variant="filled" />
      } else if (request.status === 'rejected') {
        return <Chip label="Rejected" color="error" variant="filled" />
      }
    }

  }


  const formattedDate = dayjs(event.datetime).format('dddd, MMMM D, YYYY [at] h:mm A');

  const LAT = '60.46279367851973', LON = '22.28889103052577';

  return (
    <Container maxWidth="md">
      <Card sx={{ my: 3, mb: 6 }}>
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





          <Typography whiteSpace="pre-line" sx={{ mt: 3 }} paragraph>{parse(event.description)}</Typography>

          {/* <iframe
            width="100%"
            height="400px"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src={`https://maps.google.com/maps?q=${LAT},${LON}&hl=en&z=15&amp&output=embed`}
          >
          </iframe> */}

          <Button sx={{ display: canJoin() ? 'unset' : 'none' }}
            variant="contained" color="error"
            onClick={() => { joinRequest() }}>
            Join
          </Button>
          {
            getJoinStatus()
          }
        </CardContent>
      </Card>

      <Card sx={{ my: 3, display: canViewAttendee() ? 'unset' : 'none' }}>
        <Container disableGutters>
          <Typography variant="h6" sx={{ mt: 4, mx: 2 }} >
            Attendees {` (${getAttendeeCount()})`}
          </Typography>
        </Container>
        <CardContent style={{ textAlign: 'start' }}>
          <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
            {
              event.applications.filter(i => i.status === "accepted" || i.status === "pending").map(item =>
                <ListItem
                  secondaryAction={
                    item.status === 'pending' &&
                    <>
                      <Button onClick={() => giveDecision(item.id, 'accepted')} color='success' startIcon={<ThumbUpIcon />} >
                        Accept
                      </Button>
                      <Button onClick={() => giveDecision(item.id, 'rejected')} sx={{ ml: 2 }} color='error' startIcon={<ThumbDownIcon />} >
                        Decline
                      </Button>
                    </>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={`https://source.unsplash.com/random?wallpapers&${event.id}`}>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`${item?.user?.firstname || ''} ${item?.user?.lastname || ''}`} secondary={`${item?.user?.email}`} />
                </ListItem>)
            }
            {/* <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Dhola dipzol" secondary="Jan 7, 2014" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Vacation" secondary="July 20, 2014" />
            </ListItem> */}
          </List>
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
