// ProfileEdit.jsx
import React, { useState, useRef } from 'react';
import { Card, CardContent, Avatar, Grid, Button, TextField, Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [editedUser, setEditedUser] = useState({
    name: 'John Doe',
    username: 'johndoe123',
    email: 'john@example.com',
    avatarUrl: 'https://placekitten.com/200/200', // Replace with the actual URL of the user's avatar
    age: 25,
    nationality: 'French',
    languages: ['French', 'English'],
    interests: ['Coding', 'Reading', 'Traveling'],
    type: 'User',
  });

  const handleCancel = () => {
    navigate('/profile');
  };

  const handleValidateProfile = () => {
    console.log('Edited User:', editedUser);

    navigate('/profile');
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
              label="Age"
              type="number"
              value={editedUser.age}
              onChange={(e) => setEditedUser({ ...editedUser, age: parseInt(e.target.value, 10) })}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Interests"
              value={editedUser.interests.join(', ')}
              onChange={(e) => setEditedUser({ ...editedUser, interests: e.target.value.split(',').map(item => item.trim()) })}
              fullWidth
              sx={{ mb: 2 }}
            />

            <Button variant="contained" color='error' onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" color='primary' onClick={handleValidateProfile} sx={{ ml: 5 }}>
              Update
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfileEdit;
