// ProfileEditBusinessBusiness.jsx
import React, { useState, useRef } from 'react';
import { Card, CardContent, Avatar, Grid, Button, TextField, Fab, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const ProfileEditBusiness = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [editedUser, setEditedUser] = useState({
    name: 'Turku Bistro',
    username: 'turkubistro',
    email: 'turku.bistro@outlook.org',
    avatarUrl: 'https://cdn.sortiraparis.com/images/80/100789/834071-too-restaurant-too-hotel-paris-photos-menu-entrees.jpg', // Replace with the actual URL of the user's avatar
    location: 'Hämeenkatu 10, Turku',
    price: '25.99',
    currency: '€',
    discount: '10',
    type: 'Business',
  });

  const handleCancel = () => {
    navigate('/profile-business');
  };

  const handleValidateProfile = () => {
    console.log('Edited User:', editedUser);

    navigate('/profile-business');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser({ ...editedUser, avatarUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFabClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
      <Grid item>
        <Card style={{ width: '50%', margin: 'auto' }}>
          <CardContent style={{ textAlign: 'center', position: 'relative' }}>
            <Avatar alt={editedUser.name} src={editedUser.avatarUrl} style={{ width: 100, height: 100, margin: '0 auto 16px' }} />
            <div style={{ position: 'absolute', top: 8, right: 8 }}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="avatar-input"
              />
              <Fab color="primary" aria-label="add" onClick={handleFabClick}>
                <AddIcon />
              </Fab>
            </div>

            <TextField
              label="Name"
              value={editedUser.name}
              onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Username"
              value={editedUser.username}
              onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              value={editedUser.email}
              onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label="Location"
              value={editedUser.location}
              onChange={(e) => setEditedUser({ ...editedUser, location: e.target.value })}
              fullWidth
              sx={{ mb: 2 }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <TextField
                label="Price"
                value={editedUser.price}
                onChange={(e) => setEditedUser({ ...editedUser, price: e.target.value })}
                sx={{ width: '73%' }}
              />
              <InputLabel htmlFor="currency-select"></InputLabel>
              <Select
                label="Currency"
                id="currency-select"
                value={editedUser.currency}
                onChange={(e) => setEditedUser({ ...editedUser, currency: e.target.value })}
                sx={{ width: '25%' }}
              >
                <MenuItem value="€">€</MenuItem>
                <MenuItem value="$">$</MenuItem>
                <MenuItem value="£">£</MenuItem>
              </Select>
            </div>

            <TextField
              label="Discount"
              value={editedUser.discount}
              onChange={(e) => setEditedUser({ ...editedUser, discount: e.target.value })}
              fullWidth
              sx={{ mb: 2 }}
            />

            <Button variant="contained" color='error' onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" color='primary' onClick={handleValidateProfile} sx={{ ml: 5 }}>
              Validate
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfileEditBusiness;
