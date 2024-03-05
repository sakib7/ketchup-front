import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import axiosInstance from '../components/auth/axiosInstance';
import { Avatar, Container } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Link from '@mui/material/Link';

export default function ChatPage() {
  const [userProfile, setUserProfile] = useState({});
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState({});
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    fetchProfile();
    getMessages();
  }, [])

  useEffect(() => {
    formatMessage()
  }, [messages, userData])



  const getMessages = async () => {
    try {
      const response = await axiosInstance.get(`/message`);
      if (response.status === 200) {
        setMessages(response.data)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatMessage = () => {
    const userList = []
    messages.reverse().map((message) => {
      const { sender, receiver, datetime } = message;
      const user_ids = userList.map(i => i.id)
      if (!user_ids.includes(sender.id)) userList.push(sender)
      if (!user_ids.includes(receiver.id)) userList.push(receiver)
    })
    setUserList(userList.filter(i => i.id != userData.id));
    console.log(userList);
  }

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get(`/profile`);
      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <Container maxWidth="md" sx={{
      mt: 2,
      mb: 5,
      maxWidth: { xs: '100%', sm: '600px' },
      px: 0
    }}>
      <Box sx={{ width: '100%', margin: "0px auto", maxWidth: 500, bgcolor: 'background.paper' }}>
        <List>
          {
            userList.map(profile =>
              <Link color="inherit" underline="none" component={RouterLink} to={`/chat/${profile?.id}`}>
                <ListItem key={profile.id} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar
                        alt={`${profile?.firstname || ''} ${profile?.lastname || ''}`}
                        src={profile?.avatar}
                      />
                    </ListItemIcon>
                    <ListItemText primary={`${profile?.firstname || ''} ${profile?.lastname || ''}`} />
                  </ListItemButton>
                </ListItem>
              </Link>

            )
          }

        </List>
      </Box>
    </Container>

  );
}