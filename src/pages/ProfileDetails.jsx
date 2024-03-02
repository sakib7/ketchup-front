import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar, Card, CardContent, CardMedia, Divider, Stack, Typography } from '@mui/material';
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

export default function ProfileDetails({ open, profile, handleSelect, handleClose }) {
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
          {`${profile?.firstname || ''} ${profile?.lastname || ''}`}

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

          <Avatar alt={profile.name} src={profile.avatar} style={{ width: 100, height: 100, margin: '0 auto 16px' }} />


          <Stack direction={'row'} py={1} alignItems={'center'} justifyContent={'space-between'} sx={{
            px: { xs: '0px', sm: '50px' }
          }}>
            <Typography variant="h6" fontSize={18} >
              {`Full name:`}
            </Typography>
            <Typography variant="p" fontSize={18} >
              {`${profile.firstname || ''} ${profile.lastname || ''}`}
            </Typography>
          </Stack>

          <Stack direction={'column'} py={1} alignItems={'flex-start'}
            sx={{
              px: { xs: '0px', sm: '50px' }
            }}
          >
            <Typography variant="h6" fontSize={18} >
              {`Bio:`}
            </Typography>
            <Typography variant="p" fontSize={18} >
              {parse(profile.bio || '')}
            </Typography>
          </Stack >
        </DialogContent>

      </BootstrapDialog>
    </React.Fragment >
  );
}