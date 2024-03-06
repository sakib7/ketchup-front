// ProfileView.js
import React, { useEffect, useState } from 'react';
import { Card, CardMedia, Typography, Avatar, Chip, Button, Paper, Stack, Divider } from '@mui/material';
import { useAuth } from '../components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import axiosInstance from '../components/auth/axiosInstance';
import VerifiedIcon from '@mui/icons-material/Verified';
import ErrorIcon from '@mui/icons-material/Error';

const ProfileView = () => {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();
  const [interestOptions, setInterestOption] = useState([])
  const [userProfile, setUserProfile] = useState({});
  const [userRoot, setUserRoot] = useState({});
  useEffect(() => {
    getProfile();
    fetchInterests();
  }, [])



  const handleLogout = () => {
    // Add your logout logic here
    logout()
    console.log('Logout button clicked');
  };

  const handleEditProfile = () => {
    navigate('/edit-business');
  };

  const getProfile = async () => {
    try {
      const response = await axiosInstance.get('/profile');
      if (response.status === 200) {
        setUserProfile(response.data?.business_profile)
        setUserRoot(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
    <Paper
      elevation={5}

      // variant='outlined'
      sx={{
        mx: 'auto',
        mt: 3,
        mb: 3,
        maxWidth: { xs: '95%', sm: '50%' },
        padding: 3,
      }}>
      <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} >

        <Avatar
          alt={userProfile.name}
          src={userRoot.avatar}
          style={{ width: 100, height: 100 }} />


        {
          userRoot.email_verified ?
            <Chip
              icon={<VerifiedIcon />}
              label="Verified"
              variant="outlined"
              color='success'
              sx={{ my: 2 }}
            />
            :
            <Chip
              icon={<ErrorIcon />}
              label="Not Verified"
              variant="outlined"
              color='error'
              sx={{ my: 2 }}
            />
        }
      </Stack>
      <Divider />



      <Stack direction={'row'} py={1} alignItems={'center'} justifyContent={'space-between'} sx={{
        px: { xs: '0px', sm: '50px' }
      }}>
        <Typography variant="h6" fontSize={18} >
          Name
        </Typography>
        <Typography variant="p" fontSize={18} textAlign={'right'}>
          {`${userProfile.name || ''}`}
        </Typography>
      </Stack>
      <Divider />

      <Stack
        direction={'row'}
        py={1}
        alignItems={'center'}
        justifyContent={'space-between'} sx={{
          px: { xs: '0px', sm: '50px' }
        }}
      >
        <Typography variant="h6" fontSize={18} >
          {`Address`}
        </Typography>
        <Typography variant="p" fontSize={18} pl={3} pr={0} textAlign={'right'}>
          {`${userProfile.address || ''}`}
        </Typography>
      </Stack>
      <Divider />

      <Stack direction={'row'} py={1} alignItems={'center'} justifyContent={'space-between'} sx={{
        px: { xs: '0px', sm: '50px' }
      }}>
        <Typography variant="h6" fontSize={18} >
          Contact Number
        </Typography>
        <Typography variant="p" fontSize={18} textAlign={'right'}>
          {`${userProfile.phone_number || ''}`}
        </Typography>
      </Stack>
      <Divider />

      <Stack direction={'row'} py={1} alignItems={'center'} justifyContent={'space-between'} sx={{
        px: { xs: '0px', sm: '50px' }
      }}>
        <Typography variant="h6" fontSize={18} >
          Interests
        </Typography>
        <Typography variant="p" fontSize={18} textAlign={'right'}>
          {interestOptions
            .filter(i => userProfile.interests?.includes(i.id))
            .map(i =>
              <Chip label={i.name} color="primary" sx={{ ml: 2 }} />
            )}
        </Typography>
      </Stack>
      <Divider />

      <Stack direction={'row'} py={1} alignItems={'center'} justifyContent={'space-between'} sx={{
        px: { xs: '0px', sm: '50px' }
      }}>
        <Typography variant="h6" fontSize={18} >
          Discount
        </Typography>
        <Typography variant="p" fontSize={18} textAlign={'right'}>
          {`${userProfile.discount || '0'}%`}
        </Typography>
      </Stack>
      <Divider />

      <Stack direction={'row'} py={1} alignItems={'center'} justifyContent={'space-between'} sx={{
        px: { xs: '0px', sm: '50px' }
      }}>
        <Typography variant="h6" fontSize={18} >
          Starting Price
        </Typography>
        <Typography variant="p" fontSize={18} textAlign={'right'}>
          {`${userProfile.starting_price || '0'}€`}
        </Typography>
      </Stack>
      <Divider />

      <Stack direction={'column'} py={1} alignItems={'flex-start'}
        sx={{
          px: { xs: '0px', sm: '50px' }
        }}
      >
        <Typography variant="h6" fontSize={18} >
          Opening hours:
        </Typography>
        <Typography variant="p" mt={2} fontSize={18} style={{ whiteSpace: 'pre-wrap' }} >
          {parse(userProfile.opening_hours || '')}
        </Typography>
      </Stack >
      <Divider />

      <Stack direction={'column'} py={1} alignItems={'flex-start'}
        sx={{
          px: { xs: '0px', sm: '50px' }
        }}
      >
        <Typography variant="h6" fontSize={18} >
          Business Description:
        </Typography>
        <Typography variant="p" fontSize={18} >
          {parse(userProfile.description || '')}
        </Typography>
        {userProfile.image &&
          <Card sx={{ maxWidth: '100%' }}>
            <CardMedia
              component="img"
              height="undefined"
              src={userProfile.image}
              alt="green iguana"
            />
          </Card>
        }

      </Stack >
      <Divider />



      <Stack direction={'row'}
        py={2}
        alignItems={'center'}
        justifyContent={'center'}
        sx={{
          px: { xs: '0px', sm: '50px' }
        }}>
        <Button variant="contained" color='primary' onClick={handleEditProfile} sx={{ ml: 5 }}>
          Edit Profile
        </Button>
        <Button sx={{ ml: 2 }} variant="contained" color='error' onClick={handleLogout}>
          Logout
        </Button>
      </Stack>

    </Paper >

  );
};

export default ProfileView;
