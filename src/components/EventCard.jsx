import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import zIndex from '@mui/material/styles/zIndex';

export default function EventCard({ event }) {
  return (
    <Card sx={{ width: "95%", height: "100%", display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`https://source.unsplash.com/random?wallpapers&${event.id}`}
        title="green iguana"
      />
      <CardContent style={{ flex: '1' }}>
        <Typography gutterBottom variant="h6" fontSize={18} component="div">
          {event?.title}
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="div" style={{ display: 'flex', alignItems: 'center' }}>
          <PersonIcon sx={{ mr: 1 }} />  {event?.host}
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="div" style={{ display: 'flex', alignItems: 'center' }}>
          <AccessTimeRoundedIcon sx={{ mr: 1 }} /> {event?.time}
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="div" style={{ display: 'flex', alignItems: 'center' }}>
          <PlaceRoundedIcon sx={{ mr: 1 }} /> Place: {event?.place}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'flex-end' }}>

        <Button style={{ zIndex: 10 }} size="small" color='error'>Join</Button>
      </CardActions>
    </Card >
  );
}
