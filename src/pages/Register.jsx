import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, Link as RouterLink } from 'react-router-dom';
import axiosInstance from '../components/auth/axiosInstance';
import { Alert, Snackbar } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" component={RouterLink} to="/events">
        KetchUp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const [registered, setRegistered] = useState(false)
  const [alert, setAlert] = useState({
    message: "",
    severity: "error",
    open: false
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      "email": formData.get('email'),
      "username": formData.get('email'),
      "password": formData.get('password'),
      "firstname": formData.get('firstName'),
      "lastname": formData.get('lastName'),
      "role": 'user'
    }
    handleRegister(data)
    console.log(data);
  };

  const handleRegister = async (data) => {
    try {
      const response = await axiosInstance.post('/register', data);
      if (response.status === 201) {
        setAlert({
          severity: "success",
          message: "Successfully Registered!",
          open: true
        })
        setTimeout(() => {
          setRegistered(true)
        }, 2000);
      }

    } catch (error) {
      console.error('Login failed:', error);
      setAlert({
        severity: "error",
        message: "Registration Failed\t" + error?.response?.data?.message,
        open: true
      })
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
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid display={"none"} item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>

                <Link variant="body2" component={RouterLink} to="/login">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {
        registered && <Navigate to={"/login"} />
      }

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
    </ThemeProvider>
  );
}