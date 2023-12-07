// ProfileViewBusinessBusiness.jsx
import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid, Button } from '@mui/material';
import { useAuth } from '../components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfileViewBusiness = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const business = {
    name: 'Turku Bistro',
    username: 'turkubistro',
    email: 'turku.bistro@outlook.org',
    avatarUrl: 'https://cdn.sortiraparis.com/images/80/100789/834071-too-restaurant-too-hotel-paris-photos-menu-entrees.jpg', // Replace with the actual URL of the user's avatar
    location: 'Hämeenkatu 10, Turku',
    price: '25.99',
    currency: '€',
    discount: '10',
    type: 'Business',
  };

  const handleLogout = () => {
    // Add your logout logic here
    logout()
    console.log('Logout button clicked');
  };

  const handleEditProfile = () => {
    navigate('/edit-profile-business');
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
      <Grid item>
        <Card style={{ minWidth: 300 }}>
          <CardContent style={{ textAlign: 'center' }}>
            <Avatar alt={business.name} src={business.avatarUrl} style={{ width: 100, height: 100, margin: '0 auto 16px' }} />
            <Typography variant="h5" gutterBottom>
              {business.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              @{business.username}
            </Typography>
            <Typography variant="body1" paragraph>
              Email: {business.email}
            </Typography>
            <Typography variant="body1" paragraph>
              Location: {business.location}
            </Typography>
            <Typography variant="body1" paragraph>
              Price: {business.price + business.currency}
            </Typography>
            <Typography variant="body1" paragraph>
              Discount: {business.discount + '%'}
            </Typography>
            <Button variant="contained" color='error' onClick={handleLogout}>
              Logout
            </Button>
            <Button variant="contained" color='primary' onClick={handleEditProfile} sx={{ ml: 5 }}>
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfileViewBusiness;