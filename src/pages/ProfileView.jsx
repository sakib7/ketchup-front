// ProfileView.js
import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid, Button } from '@mui/material';
import { useAuth } from '../components/auth/AuthContext';

const ProfileView = () => {
  const { logout } = useAuth();

  const user = {
    name: 'John Doe',
    username: 'johndoe123',
    email: 'john@example.com',
    avatarUrl: 'https://placekitten.com/200/200', // Replace with the actual URL of the user's avatar
  };

  const handleLogout = () => {
    // Add your logout logic here
    logout()
    console.log('Logout button clicked');
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
      <Grid item>
        <Card style={{ minWidth: 300 }}>
          <CardContent style={{ textAlign: 'center' }}>
            <Avatar alt={user.name} src={user.avatarUrl} style={{ width: 100, height: 100, margin: '0 auto 16px' }} />
            <Typography variant="h5" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              @{user.username}
            </Typography>
            <Typography variant="body1" paragraph>
              Email: {user.email}
            </Typography>
            <Button variant="contained" color='error' onClick={handleLogout}>
              Logout
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfileView;
