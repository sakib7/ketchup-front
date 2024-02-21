// ProfileEdit.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Autocomplete, Avatar, Card, CardMedia, Grid, TextField, Typography, Fab, Stack, Paper, Button, Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axiosInstance from '../components/auth/axiosInstance';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ProfileEditBusiness = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  useEffect(() => {
    fetchInterests();
    fetchProfile();
  }, [])
  const [interestOptions, setInterestOption] = useState([])
  const [userRoot, setUserRoot] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [quilText, setQuilText] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

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
        setUserProfile(response.data?.business_profile);
        setUserRoot(response.data);
        setQuilText(response.data?.business_profile?.description)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const updateProfile = async () => {
    console.log(userProfile);
    try {
      const response = await axiosInstance.patch(`/profile`, {
        business_profile: {
          name: userProfile.name,
          address: userProfile.address,
          description: quilText,
          interests: userProfile.interests,
          phone_number: userProfile.phone_number,
          discount: userProfile.discount,
          starting_price: userProfile.starting_price,
          opening_hours: userProfile.opening_hours
        },

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
      console.error(error.response.data);
      setAlert({
        severity: "error",
        message: JSON.stringify(error.response.data),
        open: true
      })
    }
  }

  const updateAvatar = async () => {
    if (!avatarFile && !imageFile) return;
    const formData = new FormData();
    avatarFile && formData.append("avatar", avatarFile)
    imageFile && formData.append("business_profile.image", imageFile)
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
    const targetName = e.target.name
    console.log(targetName);
    if (targetName == "image") {
      setImageFile(file)
    } else if (targetName == "avatar") {
      setAvatarFile(file)

    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (targetName == "image") {
          setUserProfile({ ...userProfile, image: reader.result });
        } else if (targetName == "avatar") {
          setUserRoot({ ...userRoot, avatar: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFabClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleImageClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };



  const handleClose = () => {
    setAlert({
      open: false,
      message: "",
      severity: "error",
    })
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    })
  }

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
            <Avatar alt={userProfile.name} src={userRoot.avatar} style={{ width: 100, height: 100 }} />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="avatar-input"
              name='avatar'
            />
            <Fab size='medium' sx={{ ml: 2 }} color="primary" aria-label="add" onClick={handleFabClick}>
              <AddIcon />
            </Fab>

          </Stack>
        </Grid>

        <Grid item xs={12} >
          <TextField
            label=" Name"
            name='name'
            value={userProfile.name || ''}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 4 }}
          // InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            value={userRoot.email || ''}
            fullWidth
            sx={{ mb: 4 }}
            disabled
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            label="Address"
            name='address'
            value={userProfile.address || ''}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 4 }}

          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            label="Contact number"
            name='phone_number'
            value={userProfile.phone_number || ''}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 4 }}

          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            label="Discount Upto (%)"
            name='discount'
            value={userProfile.discount || ''}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 4 }}

          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            label="Staring price ($)"
            name='starting_price'
            value={userProfile.starting_price || ''}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 4 }}

          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            label="Opening hours"
            name='opening_hours'
            value={userProfile.opening_hours || ''}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 4 }}
            rows={7}
            multiline
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

        <Typography gutterBottom variant="h6"
          fontSize={16} textAlign={'left'}
          my={2} component="div">
          Business Description
        </Typography>

        <Grid item xs={12} mb={4}>
          <ReactQuill
            value={quilText}
            onChange={(e) => {
              console.log(e)
              setQuilText(e)
            }}
            modules={{
              toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['link'],
                ['clean']
              ],
              clipboard: {
                matchVisual: false,
              },
            }}
            formats={[
              'header',
              'bold', 'italic', 'underline', 'strike', 'blockquote',
              'list', 'bullet', 'indent',
              'link',
            ]} />
        </Grid>

        <Typography gutterBottom variant="h6"
          fontSize={16} textAlign={'left'}
          my={2} component="div">
          Description Image
        </Typography>

        <Grid item xs={12} >
          <Stack
            direction={'column'}
            mb={4}
            alignItems="flex-start"
            justifyContent="center"
          >
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="image-input"
              name='image'
            />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              sx={{ mb: 4 }}
              onClick={handleImageClick}
              startIcon={<CloudUploadIcon />}
            >
              Upload Image
            </Button>
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



          </Stack>
        </Grid>

        <Grid item xs={12} >
          <Stack direction='row' justifyContent='center' my={5}>
            <Button variant="contained" color='error' onClick={handleCancel}>
              Cancel
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
        autoHideDuration={3000}
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

export default ProfileEditBusiness;
