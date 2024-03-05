import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar, CardContent, CardMedia, Chip, Divider, Stack, Typography } from '@mui/material';
import DiscountIcon from '@mui/icons-material/Discount';
import EuroIcon from '@mui/icons-material/Euro';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CallIcon from '@mui/icons-material/Call';
import parse from 'html-react-parser';
import VerifiedIcon from '@mui/icons-material/Verified';
import ErrorIcon from '@mui/icons-material/Error';
import axiosInstance from '../components/auth/axiosInstance';
import SendIcon from '@mui/icons-material/Send';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Link from '@mui/material/Link';

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
  const [interestOptions, setInterestOption] = useState([])

  useEffect(() => {
    fetchInterests();
  }, [])
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
          <Stack
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            mb={1}
          >
            <Avatar
              alt={profile?.name}
              src={profile?.avatar}
              style={{ width: 100, height: 100, }} />
            <Stack my={2} direction={'row'} justifyContent={'center'} alignItems={'center'}>
              {
                profile.email_verified ?
                  <Chip
                    icon={<VerifiedIcon />}
                    label="Verified"
                    variant="outlined"
                    color='success'
                  />
                  :
                  <Chip
                    icon={<ErrorIcon />}
                    label="Not Verified"
                    variant="outlined"
                    color='error'
                  />
              }

              <Link color="inherit" underline="none" component={RouterLink} to={`/chat/${profile?.id}`}>
                <Button sx={{ ml: 2 }} color='success' variant="contained" size='small' endIcon={<SendIcon />}>
                  Send Message
                </Button>
              </Link>
            </Stack>
          </Stack>
          <Divider />


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
          <Divider />


          <Stack direction={'row'} py={1} alignItems={'center'} justifyContent={'space-between'} sx={{
            px: { xs: '0px', sm: '50px' }
          }}>
            <Typography variant="h6" fontSize={18} >
              {`Interests:`}
            </Typography>
            <Stack direction={'row'} flexWrap={'wrap'} ml={6}>
              {
                interestOptions
                  .filter(item => profile?.interests
                    ? profile?.interests.includes(item.id)
                    : false)
                  .map(
                    item => (
                      <Chip
                        label={item.name}
                        variant="filled"
                        color='primary'
                        sx={{ ml: 1, mb: 1 }}
                        key={item.id}
                      />
                    )
                  )

              }
            </Stack>
          </Stack>
          <Divider />

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