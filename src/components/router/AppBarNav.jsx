import { AppBar, BottomNavigation, BottomNavigationAction, Box, Button, Paper, Stack, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import RestoreIcon from '@mui/icons-material/search';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SMSIcon from '@mui/icons-material/sms';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Link from '@mui/material/Link';
export default function AppBarNav() {
  const [bottomMenu, setBottomMenu] = useState("");
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



        <Box sx={{ display: { xs: "none", sm: "none", md: "inherit" } }}>
          <Link color="inherit" underline="none" component={RouterLink} to="/events">
            <Button color={location.pathname === "/events" ? "customColor" : "inherit"} startIcon={<GroupRoundedIcon />} >
              Ketchups
            </Button>
          </Link>



          {/* <Button color="inherit" startIcon={<GroupRoundedIcon />} >
            Ketchups
          </Button> */}
          <Button color="inherit" href='/events' startIcon={<SearchRoundedIcon />}>Explore</Button>
          <Button color="inherit" startIcon={<SMSIcon fontSize='small' />}>Messages</Button>
          {/* <Button color="inherit" startIcon={<PersonIcon />}>Profile</Button> */}
          <Link color="inherit" underline="none" component={RouterLink} to="/login">
            <Button color={location.pathname === "/login" || location.pathname === "/register" ? "customColor" : "inherit"} startIcon={<PersonIcon />}>Profile</Button>
          </Link>
        </Box>




      </Toolbar>

    </AppBar >

  );
}
