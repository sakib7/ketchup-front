// ProfileView.js
import React, { useEffect, useState } from 'react';
import { Chip, Typography, Avatar, Grid, Button, Paper, Stack, Divider } from '@mui/material';
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
  useEffect(() => {
    getProfile();
    fetchInterests();
  }, [])

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
      const response = await axiosInstance.get('/profile');
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
        maxWidth: { xs: '95%', sm: '40%' },
        padding: 3,
      }}>

      <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} >

        <Avatar
          alt={user.name}
          src={userProfile.avatar}
          style={{ width: 100, height: 100 }} />

        {
          userProfile.email_verified ?
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
          {`Full name:`}
        </Typography>
        <Typography variant="p" fontSize={18} >
          {`${userProfile.firstname || ''} ${userProfile.lastname || ''}`}
        </Typography>
      </Stack>
      <Divider />

      <Stack
        direction={'row'}
        py={1}
        alignItems={'center'}
        justifyContent={'space-between'}
        sx={{
          px: { xs: '0px', sm: '50px' }
        }}>
        <Typography variant="h6" fontSize={18}>
          {`Email:`}
        </Typography>
        <Stack direction={'row'} justifyContent={'center'}>
          <Typography variant="p" fontSize={18} >
            {`${userProfile.email || ''}`}
          </Typography>
        </Stack>
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
              .filter(item => userProfile?.interests
                ? userProfile?.interests.includes(item.id)
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
        <Button variant="contained" color='primary' onClick={handleEditProfile} sx={{ ml: 5 }}>
          Edit Profile
        </Button>
        <Button sx={{ ml: 2 }} variant="contained" color='error' onClick={handleLogout}>
          Logout
        </Button>
      </Stack>

    </Paper >
    // <Grid container justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
    //   <Grid item>
    //     <Card style={{ minWidth: 300 }}>
    //       <CardContent style={{ textAlign: 'center' }}>
    //         <Avatar alt={user.name} src={user.avatarUrl} style={{ width: 100, height: 100, margin: '0 auto 16px' }} />
    //         <Typography variant="h5" gutterBottom>
    //           {`${userData.firstname || ''} ${userData.lastname || ''}`}
    //         </Typography>
    //         <Typography variant="subtitle1" color="textSecondary">
    //           {userData.username}
    //         </Typography>
    //         <Typography variant="body1" paragraph>
    //           Email: {userData.email}
    //         </Typography>
    //         <Typography variant="body1" paragraph>
    //           Age: {user.age}
    //         </Typography>
    //         <Typography variant="body1" paragraph>
    //           Nationality: {user.nationality}
    //         </Typography>
    //         <Typography variant="body1" paragraph>
    //           Languages: {user.languages.join(', ')}
    //         </Typography>
    //         <Typography variant="body1" paragraph>
    //           Interests: {user.interests.join(', ')}
    //         </Typography>
    //         <Typography variant="body1" paragraph>
    //           Nationality: {parse(user.description)}
    //         </Typography>
    //         <Button variant="contained" color='primary' onClick={handleEditProfile} sx={{ ml: 5 }}>
    //           Edit Profile
    //         </Button>
    //         <Button sx={{ ml: 2 }} variant="contained" color='error' onClick={handleLogout}>
    //           Logout
    //         </Button>
    //       </CardContent>
    //     </Card>
    //   </Grid>
    // </Grid>
  );
};

export default ProfileView;
