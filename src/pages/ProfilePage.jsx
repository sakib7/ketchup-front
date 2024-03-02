// ProfilePage.js
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Avatar, Grid, Button, Paper, Stack, Divider } from '@mui/material';
import { useAuth } from '../components/auth/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import axiosInstance from '../components/auth/axiosInstance';

const ProfilePage = () => {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    getProfile()
  }, [])
  const { profileId } = useParams();


  const user = {
    name: 'John Doe',
    username: 'johndoe123',
    email: 'john@example.com',
    avatarUrl: 'https://placekitten.com/200/200', // Replace with the actual URL of the user's avatar
    age: 25,
    nationality: 'French',
    languages: ['French', 'English'],
    interests: ['Coding', 'Reading', 'Traveling'],
    type: 'User',
    description: '<ol><li><strong>ddrrrd</strong></li><li><em><u>twp</u></em></li><li><br></li></ol>'

  };

  const handleLogout = () => {
    // Add your logout logic here
    logout()
    console.log('Logout button clicked');
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const getProfile = async () => {
    try {
      const response = await axiosInstance.get(`/profile/${profileId}`);
      if (response.status === 200) {
        setUserProfile(response.data)
      }

    } catch (error) {
      console.error(error);
    }
  };

  console.log(userProfile.bio);

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

      <Avatar alt={user.name} src={userProfile.avatar} style={{ width: 100, height: 100, margin: '0 auto 16px' }} />
      <Divider />



      <Stack direction={'row'} py={1} alignItems={'center'} justifyContent={'space-between'} sx={{
        px: { xs: '0px', sm: '50px' }
      }}>
        <Typography variant="h6" fontSize={18} >
          {`Full name:`}
        </Typography>
        <Typography variant="p" fontSize={18} >
          {`${userProfile.firstname || ''} ${userProfile.lastname || ''}`}
        </Typography>
      </Stack>
      <Divider />

      <Stack direction={'row'} py={1} alignItems={'center'} justifyContent={'space-between'} sx={{
        px: { xs: '0px', sm: '50px' }
      }}>
        <Typography variant="h6" fontSize={18} >
          {`Email`}
        </Typography>
        <Typography variant="p" fontSize={18} >
          {`${userProfile.email || ''}`}
        </Typography>
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
          {parse(userProfile.bio || '')}
        </Typography>
      </Stack >
      <Divider />



      <Stack direction={'row'}
        py={1}
        alignItems={'center'}
        justifyContent={'center'}
        sx={{
          px: { xs: '0px', sm: '50px' }
        }}>
        <Button variant="contained" color='primary' sx={{ ml: 5 }}>
          Send Message
        </Button>
        <Button sx={{ ml: 2 }} variant="contained" color='error' >
          Report
        </Button>
      </Stack>

    </Paper >
  );
};

export default ProfilePage;
