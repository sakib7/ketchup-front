import { AppBar, BottomNavigation, BottomNavigationAction, Box, Button, Paper, Stack, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SMSIcon from '@mui/icons-material/Sms';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useAuth } from '../auth/AuthContext';
export default function AppBarNav() {
  const [bottomMenu, setBottomMenu] = useState("");
  const { userData, token } = useAuth();
  const location = useLocation();
  const theme = createTheme({
    palette: {
      customColor: {
        main: '#eeff41', // Replace with your desired custom color
      },
    },
  });
  return (

    <AppBar position="relative">
      <Toolbar>
        <GroupRoundedIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          Ketchup
        </Typography>



        {
          userData.role == "business" ?
            <Box sx={{ display: { xs: "none", sm: "none", md: "inherit" } }}>
              <Link color="inherit" underline="none" component={RouterLink} to="/profile">
                <Button color={location.pathname === "/login"
                  || location.pathname === "/profile"
                  || location.pathname === "/register" ? "customColor" : "inherit"} startIcon={<PersonIcon />}>Profile</Button>
              </Link>
            </Box> :
            <Box sx={{ display: { xs: "none", sm: "none", md: "inherit" } }}>
              <Link color="inherit" underline="none" component={RouterLink} to="/explore">
                <Button color={location.pathname === "/explore" ? "customColor" : "inherit"} startIcon={<SearchRoundedIcon />} >
                  Explore
                </Button>
              </Link>
              <Link color="inherit" underline="none" component={RouterLink} to="/events">
                <Button color={location.pathname === "/events" ? "customColor" : "inherit"} startIcon={<GroupRoundedIcon />} >
                  Ketchups
                </Button>
              </Link>

              {/* <Button color="inherit" startIcon={<GroupRoundedIcon />} >
            Ketchups
          </Button> */}
              {/* <Button color="inherit" href='/events' startIcon={<SearchRoundedIcon />}>Explore</Button> */}
              <Link color="inherit" underline="none" component={RouterLink} to="/chat">
                <Button color={location.pathname === "/chat" ? "customColor" : "inherit"}
                  startIcon={<SMSIcon fontSize='small' />} >
                  Messages
                </Button>
              </Link>
              {/* <Button color="inherit" startIcon={<SMSIcon fontSize='small' />}>Messages</Button> */}
              {/* <Button color="inherit" startIcon={<PersonIcon />}>Profile</Button> */}
              <Link color="inherit" underline="none" component={RouterLink} to="/profile">
                <Button color={location.pathname === "/login"
                  || location.pathname === "/profile"
                  || location.pathname === "/register" ? "customColor" : "inherit"} startIcon={<PersonIcon />}>Profile</Button>
              </Link>
            </Box>

        }




      </Toolbar>

    </AppBar >

  );
}
