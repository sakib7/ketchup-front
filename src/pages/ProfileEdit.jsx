// ProfileEdit.jsx
import React, { useState, useRef } from 'react';
import { Autocomplete, Avatar, Grid, TextField, Typography, Fab, Stack, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DemoSelect from '../components/DemoSelect';

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
    description: "<p>🌟 John Doe | 28 🌈 | Cityville 🏡</p><p>🎓 Marketing Pro | 🎨 Art Enthusiast</p><p>🎵 Indie Music Lover | 📸 Photography Hobbyist</p><p>😊 Chasing dreams and enjoying the journey! ✨</p><p>Let's connect! 🤝🌟</p>"
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

  const top100Films = [
    { title: 'Music', year: 1994 },
    { title: 'Food', year: 1972 },
    { title: 'Travel', year: 1974 },
    { title: 'Café', year: 2008 },
    { title: 'Language exchange', year: 1957 },
    { title: "Museum", year: 1993 },
    { title: 'Karaoke', year: 1994 },
  ]

  return (
    <Paper
      elevation={5}

      // variant='outlined'
      sx={{
        mx: 'auto',
        mt: 3,
        mb: 3,
        maxWidth: { xs: '95%', sm: '70%' },
        padding: 3,
      }}>
      <Typography gutterBottom variant="h6"
        fontSize={20} textAlign={'center'}
        my={2} component="div">
        Edit Profile
      </Typography>
      <Grid container>
        <Grid item xs={12} >
          <Stack direction={'row'} textAlign={'center'} padding={5} alignItems="center"
            justifyContent="center">
            <Avatar alt={editedUser.name} src={editedUser.avatarUrl} style={{ width: 100, height: 100 }} />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="avatar-input"
            />
            <Fab size='medium' sx={{ ml: 2 }} color="primary" aria-label="add" onClick={handleFabClick}>
              <AddIcon />
            </Fab>

          </Stack>
        </Grid>

        <Grid item xs={12} >
          <TextField
            label="Name"
            value={editedUser.name}
            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
            fullWidth
            sx={{ mb: 4 }}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            value={editedUser.email}
            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Age"
            type="number"
            value={editedUser.age}
            onChange={(e) => setEditedUser({ ...editedUser, age: parseInt(e.target.value, 10) })}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <TextField
            label="Interests"
            value={editedUser.interests.join(', ')}
            onChange={(e) => setEditedUser({ ...editedUser, interests: e.target.value.split(',').map(item => item.trim()) })}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid> */}
        <Grid item xs={12}>
          <Stack spacing={3} sx={{ mb: 2, width: '100%' }}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              defaultValue={[top100Films[3]]}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Acitivity"
                  placeholder="Select your interest"
                />
              )}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ReactQuill
            value={editedUser.description}
            onChange={(e) => { console.log(e) }}
            modules={{
              toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['link'],
                ['clean']
              ],
            }}
            formats={[
              'header',
              'bold', 'italic', 'underline', 'strike', 'blockquote',
              'list', 'bullet', 'indent',
              'link',
            ]} />
        </Grid>
      </Grid>
    </Paper>

    // <Card style={{ margin: '20px' }}>
    //   <Stack spacing={2}>
    //     <TextField
    //       label="Name"
    //       value={editedUser.name}
    //       onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
    //       fullWidth
    //       sx={{ mb: 2 }}
    //     />
    //     <TextField
    //       label="Username"
    //       value={editedUser.username}
    //       onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
    //       fullWidth
    //       sx={{ mb: 2 }}
    //     />
    //   </Stack>
    // </Card>

    // <Grid container justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
    //   <Grid item>
    //     <Card style={{ width: '50%', margin: 'auto' }}>
    //       <CardContent style={{ textAlign: 'center', position: 'relative' }}>
    //         <Avatar alt={editedUser.name} src={editedUser.avatarUrl} style={{ width: 100, height: 100, margin: '0 auto 16px' }} />
    //         <div style={{ position: 'absolute', top: 8, right: 8 }}>
    //           <input
    //             ref={fileInputRef}
    //             type="file"
    //             accept="image/*"
    //             onChange={handleFileChange}
    //             style={{ display: 'none' }}
    //             id="avatar-input"
    //           />
    //           <Fab color="primary" aria-label="add" onClick={handleFabClick}>
    //             <AddIcon />
    //           </Fab>
    //         </div>

    //         <TextField
    //           label="Name"
    //           value={editedUser.name}
    //           onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
    //           fullWidth
    //           sx={{ mb: 2 }}
    //         />
    //         <TextField
    //           label="Username"
    //           value={editedUser.username}
    //           onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
    //           fullWidth
    //           sx={{ mb: 2 }}
    //         />
    //         <TextField
    //           label="Email"
    //           value={editedUser.email}
    //           onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
    //           fullWidth
    //           sx={{ mb: 2 }}
    //         />

    //         <TextField
    //           label="Age"
    //           type="number"
    //           value={editedUser.age}
    //           onChange={(e) => setEditedUser({ ...editedUser, age: parseInt(e.target.value, 10) })}
    //           fullWidth
    //           sx={{ mb: 2 }}
    //         />
    //         <TextField
    //           label="Interests"
    //           value={editedUser.interests.join(', ')}
    //           onChange={(e) => setEditedUser({ ...editedUser, interests: e.target.value.split(',').map(item => item.trim()) })}
    //           fullWidth
    //           sx={{ mb: 2 }}
    //         />

    //         <Button variant="contained" color='error' onClick={handleCancel}>
    //           Cancel
    //         </Button>
    //         <Button variant="contained" color='primary' onClick={handleValidateProfile} sx={{ ml: 5 }}>
    //           Update
    //         </Button>
    //       </CardContent>
    //     </Card>
    //   </Grid>
    // </Grid>
  );
};

export default ProfileEdit;
