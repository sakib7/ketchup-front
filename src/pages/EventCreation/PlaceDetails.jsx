import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import DiscountIcon from '@mui/icons-material/Discount';
import EuroIcon from '@mui/icons-material/Euro';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CallIcon from '@mui/icons-material/Call';
import parse from 'html-react-parser';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function PlaceDetails({ open, place, handleSelect, handleClose }) {
  const [scroll, setScroll] = React.useState('paper');

  const descriptionElementRef = React.useRef(null);
  // React.useEffect(() => {
  //   if (open) {
  //     const { current: descriptionElement } = descriptionElementRef;
  //     if (descriptionElement !== null) {
  //       descriptionElement.focus();
  //     }
  //   }
  // }, [open]);
  console.log(open);
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2, minWidth: { xs: '300px', sm: '600px' } }} width={'100%'} id="customized-dialog-title">
          {place?.business_profile?.name}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers style={{ padding: '20px' }}>

          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            pr={5}
          >

            <Stack>
              <Typography fontSize={15} gutterBottom variant="subtitle1" component="div" style={{ display: 'flex', alignItems: 'center' }}>
                <PlaceRoundedIcon sx={{ mr: 1 }} />  {place?.business_profile?.address}
              </Typography>
              <Typography fontSize={15} gutterBottom variant="subtitle1" component="div" style={{ display: 'flex', alignItems: 'center' }}>
                <EuroIcon sx={{ mr: 1 }} /> Starts at {place?.business_profile?.starting_price}€
              </Typography>
              <Typography fontSize={15} gutterBottom variant="subtitle1" component="div" style={{ display: 'flex', alignItems: 'center' }}>
                <DiscountIcon sx={{ mr: 1 }} /> {place?.business_profile?.discount}% OFF
              </Typography>
              <Typography fontSize={15} gutterBottom variant="subtitle1" component="div" style={{ display: 'flex', alignItems: 'center' }}>
                <CallIcon sx={{ mr: 1 }} /> {place?.business_profile?.phone_number}
              </Typography>
            </Stack>
            <Stack>
              <Avatar
                alt={place?.business_profile?.name}
                src={place?.avatar}
                style={{ width: 100, height: 100, margin: '0 auto 16px' }} />
            </Stack>
          </Stack>

          <Typography variant="h6" fontSize={18} mt={2}>
            Opening hours:
          </Typography>
          <Typography variant="p" mt={2} fontSize={14} style={{ whiteSpace: 'pre-wrap' }} >
            {parse(place?.business_profile?.opening_hours || '')}
          </Typography>

          <Typography variant="h6" fontSize={18} mt={2} >
            Place Description:
          </Typography>
          <Typography variant="p" fontSize={14} >
            {parse(place?.business_profile?.description || '')}
          </Typography>
          {place?.business_profile?.image &&
            <Card sx={{ maxWidth: '100%' }}>
              <CardMedia
                component="img"
                height="undefined"
                src={place?.business_profile?.image}
                alt="green iguana"
              />
            </Card>
          }
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSelect}>
            Choose this place
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment >
  );
}