import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import ClassIcon from '@mui/icons-material/Class';
import zIndex from '@mui/material/styles/zIndex';
import dayjs from 'dayjs';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link } from '@mui/material';
import DialogModal from './DialogModal';
import axiosInstance from './auth/axiosInstance';

export default function EventCard({ event, myEvent, fetch }) {
  let parsedDate = dayjs(event?.datetime);
  parsedDate = parsedDate.format('DD MMM YYYY, HH:mm');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleYesClick = () => {
    deleteEvent()
    handleCloseModal();
  };

  const deleteEvent = async () => {
    try {
      const response = await axiosInstance.delete(`/ketchups/${event.id}`);
      if (response.status === 204) {
        fetch()
      }

    } catch (error) {
      console.error(error);
    }
  }


  return (
    <Card sx={{ width: "95%", height: "100%", display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={event?.image || `https://placehold.co/600x400?text=KetchUp`}
        title="green iguana"
      />
      <CardContent style={{ flex: '1' }}>
        <Typography gutterBottom variant="h6" fontSize={18} component="div">
          {event?.name}
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="div" style={{ display: 'flex', alignItems: 'center' }}>
          <PersonIcon sx={{ mr: 1 }} />  {`${event?.user?.firstname || ''} ${event?.user?.lastname || ''}`}
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="div" style={{ display: 'flex', alignItems: 'center' }}>
          <AccessTimeRoundedIcon sx={{ mr: 1 }} /> Time: {parsedDate == "Invalid Date" ? "N/A" : parsedDate}
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="div" style={{ display: 'flex', alignItems: 'start' }}>
          <PlaceRoundedIcon sx={{ mr: 1, mt: 0.3 }} /> Place: {event?.address || "N/A"}
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="div" style={{ display: 'flex', alignItems: 'center' }}>
          <ClassIcon sx={{ mr: 1 }} /> Type: {event?.interest_obj?.name || "N/A"}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'flex-end' }}>
        <Link color="inherit" underline="none" component={RouterLink} to={`/events/${event?.id}`}>
          <Button style={{ zIndex: 10 }} sx={{ m: 2 }} size="small" variant='contained' color='primary'>Details</Button>
        </Link>
        {
          myEvent &&
          <>
            <Link color="inherit" underline="none" component={RouterLink} to={`/update-event/${event?.id}`}>
              <Button style={{ zIndex: 10 }} sx={{ m: 2 }} size="small" variant='contained' color='primary'>Edit</Button>
            </Link>
            <Button onClick={handleOpenModal} style={{ zIndex: 10 }} sx={{ m: 2 }} size="small" variant='contained' color='error'>Delete</Button>
          </>
        }
      </CardActions>

      <DialogModal message='Are you sure you want delete this ketch up?' open={isModalOpen} onClose={handleCloseModal} onYes={handleYesClick} />
    </Card >
  );
}
