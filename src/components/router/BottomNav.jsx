import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SMSIcon from '@mui/icons-material/Sms';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export default function BottomNav() {
  const [bottomMenu, setBottomMenu] = useState("");

  return (
    <Paper sx={{ display: { md: "none" }, position: 'fixed', zIndex: 10, bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={bottomMenu}
        onChange={(event, newValue) => {
          setBottomMenu(newValue);
        }}
      >
        <BottomNavigationAction component={RouterLink} to="/events" label="Ketchups" icon={<GroupRoundedIcon />} />
        <BottomNavigationAction label="Explore" icon={<SearchRoundedIcon />} />
        <BottomNavigationAction label="Chat" icon={<SMSIcon fontSize='small' />} />
        <BottomNavigationAction component={RouterLink} to="/login" label="Profile" icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
}