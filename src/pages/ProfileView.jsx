// ProfileView.js
import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid, Button } from '@mui/material';
import { useAuth } from '../components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

const ProfileView = () => {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();

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

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
      <Grid item>
        <Card style={{ minWidth: 300 }}>
          <CardContent style={{ textAlign: 'center' }}>
            <Avatar alt={user.name} src={user.avatarUrl} style={{ width: 100, height: 100, margin: '0 auto 16px' }} />
            <Typography variant="h5" gutterBottom>
              {`${userData.firstname || ''} ${userData.lastname || ''}`}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {userData.username}
            </Typography>
            <Typography variant="body1" paragraph>
              Email: {userData.email}
            </Typography>
            <Typography variant="body1" paragraph>
              Age: {user.age}
            </Typography>
            <Typography variant="body1" paragraph>
              Nationality: {user.nationality}
            </Typography>
            <Typography variant="body1" paragraph>
              Languages: {user.languages.join(', ')}
            </Typography>
            <Typography variant="body1" paragraph>
              Interests: {user.interests.join(', ')}
            </Typography>
            <Typography variant="body1" paragraph>
              Nationality: {parse(user.description)}
            </Typography>
            <Button variant="contained" color='primary' onClick={handleEditProfile} sx={{ ml: 5 }}>
              Edit Profile
            </Button>
            <Button sx={{ ml: 2 }} variant="contained" color='error' onClick={handleLogout}>
              Logout
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfileView;
