// ProfileEdit.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Autocomplete, Avatar, Grid, TextField, Typography, Fab, Stack, Paper, Button, Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axiosInstance from '../components/auth/axiosInstance';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  useEffect(() => {
    fetchInterests();
    fetchProfile();
  }, [])
  const [interestOptions, setInterestOption] = useState([])
  const [userProfile, setUserProfile] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);

  const [alert, setAlert] = useState({
    message: "",
    severity: "error",
    open: false
  });

  const handleCancel = () => {
    navigate('/profile');
  };

  const handleValidateProfile = () => {

    // navigate('/profile');
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

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get(`/profile`);
      if (response.status === 200) {
        setUserProfile(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const updateProfile = async () => {
    console.log(userProfile);
    try {
      const response = await axiosInstance.patch(`/profile`, {
        firstname: userProfile.firstname,
        lastname: userProfile.lastname,
        bio: userProfile.bio,
        interests: userProfile.interests
      });
      if (response.status === 200) {
        console.log(response.data);
        setAlert({
          severity: "success",
          message: "Successfully updated profile!",
          open: true
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  const updateAvatar = async () => {
    if (!avatarFile) return;
    const formData = new FormData();
    formData.append("avatar", avatarFile)
    try {
      const response = await axiosInstance.patch(`/profile`, formData);
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserProfile({ ...userProfile, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFabClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };



  const handleClose = () => {
    setAlert({
      open: false,
      message: "",
      severity: "error",
    })
  };

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
            <Avatar alt={userProfile.firstname} src={userProfile.avatar} style={{ width: 100, height: 100 }} />

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
            label="First Name"
            value={userProfile.firstname || ''}
            onChange={(e) => setUserProfile({ ...userProfile, firstname: e.target.value })}
            fullWidth
            sx={{ mb: 4 }}
          // InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            label="Last Name"
            value={userProfile.lastname || ''}
            onChange={(e) => setUserProfile({ ...userProfile, lastname: e.target.value })}
            fullWidth
            sx={{ mb: 4 }}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            value={userProfile.email || ''}
            onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
            disabled
          />
        </Grid>


        <Grid item xs={12}>
          <Stack spacing={3} sx={{ mb: 2, width: '100%' }}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={interestOptions}
              getOptionLabel={(option) => option.name}
              value={interestOptions.filter(op => userProfile.interests?.includes(op.id))}
              onChange={(event, newValue) => {
                console.log(newValue);
                setUserProfile({ ...userProfile, interests: newValue.map(i => i.id) })
              }}
              // value={[top100Films[1]]}
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

        <Grid item xs={12} >
          <ReactQuill
            value={userProfile.bio}
            onChange={(e) => {
              console.log(e)
              setUserProfile({ ...userProfile, bio: e })
            }}
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

        <Grid item xs={12} >
          <Stack direction='row' justifyContent='center' my={5}>
            <Button variant="contained" color='error' onClick={handleCancel}>
              Close
            </Button>
            <Button variant="contained" color='primary' onClick={() => {
              updateAvatar();
              updateProfile();
            }} sx={{ ml: 5 }}>
              Update
            </Button>
          </Stack>

        </Grid>
      </Grid>
      <Snackbar
        open={alert.open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity || 'success'}
          variant="filled"
          sx={{ width: '100%' }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          key={'top' + 'right'}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Paper>


  );
};

export default ProfileEdit;
