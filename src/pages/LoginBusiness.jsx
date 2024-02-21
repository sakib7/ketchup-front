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
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';
import axiosInstance from '../components/auth/axiosInstance';
import { Navigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

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

export default function LoginBusiness() {
  const { token, login } = useAuth();
  const [alert, setAlert] = useState({
    message: "",
    severity: "error",
    open: false
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      "username": formData.get('email'),
      "password": formData.get('password'),
      "role": 'business'
    }
    handleLogin(data)
    console.log(data);
  };

  const handleLogin = async (data) => {
    try {
      const response = await axiosInstance.post('/login', data);
      const { access } = response.data;
      setAlert({
        severity: "success",
        message: "Successfully logged in!",
        open: true
      })
      setTimeout(() => {
        login(access, response.data);
      }, 1000);

    } catch (error) {
      console.error('Login failed:', error);
      setAlert({
        severity: "error",
        message: "Login Failed" + Math.random(),
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
            Sign in as a Business
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link variant="body2" component={RouterLink} to="/register">
                  {"Don't have an account? Sign Up"}
                </Link>{' '}

              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      {
        token && < Navigate to="/profile" />
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