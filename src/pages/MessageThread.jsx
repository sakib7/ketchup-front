import React, { useState, useRef, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, Container, Stack, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axiosInstance from '../components/auth/axiosInstance';
import { useParams } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import ErrorIcon from '@mui/icons-material/Error';
import dayjs from 'dayjs';

export default function MessageThread() {
  const ref = useRef();
  const { profileId } = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [userData, setUserData] = useState({});


  const handleScrollToBottom = () => {
    ref.current.scrollIntoView();
  };

  useEffect(() => {
    getProfile();
    fetchProfile();
    getMessages();
    const interval = setInterval(() => {
      getMessages();
    }, 10000)
    return () => { clearInterval(interval) }
  }, [])

  const getProfile = async () => {
    try {
      const response = await axiosInstance.get(`/profile/${profileId}`);
      if (response.status === 200) {
        setUserProfile(response.data)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getMessages = async () => {
    try {
      const response = await axiosInstance.get(`/message`);
      if (response.status === 200) {
        setMessages(response.data)
      }
      setTimeout(() => {
        handleScrollToBottom();
      }, 200);
    } catch (error) {
      console.error(error);
    }
  };

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

  const sendMessages = async () => {
    const data = {
      "message": text,
      "receiver": profileId
    }
    try {
      const response = await axiosInstance.post(`/message`, data);
      if (response.status === 201) {
        getMessages()
        setText("");
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Container maxWidth="md" sx={{
      mt: 1,
      mb: 5,
      maxWidth: { xs: '100%', sm: '600px' },
      px: 0
    }}>
      <Stack my={2} direction={'row'} alignItems={'center'} justifyContent={'center'}>
        <Avatar
          alt={userProfile?.name}
          src={userProfile?.avatar}
          style={{ width: 50, height: 50, }} />
        <Typography variant="p" fontSize={18} ml={1} >
          {`${userProfile.firstname || ''} ${userProfile.lastname || ''}`}
        </Typography>
        {
          userProfile.email_verified ?
            <VerifiedIcon color='success' sx={{ ml: 1 }} />
            :
            <ErrorIcon color='error' sx={{ ml: 1 }} />
        }
      </Stack>
      <List
        sx={{
          width: '100%',
          // maxWidth: { xs: '300px', sm: '600px' },
          bgcolor: 'background.paper',
          margin: '0px auto',
          overflow: 'auto',
          maxHeight: '60vh'
        }}>
        {
          messages
            .map(item => ({
              ...item,
              datetime: dayjs(item?.datetime).format('DD MMM YYYY, HH:mm')
            }))
            .filter(item => {
              if (item.sender.id == userData.id && item.receiver.id == profileId)
                return true
              else if (item.sender.id == profileId && item.receiver.id == userData.id)
                return true
              else
                return false
            })
            .map((message, index, arr) =>
              <>
                {
                  index == arr.length - 1 && <></>
                }
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt={`${message?.sender?.firstname || ''} ${message?.sender?.lastname || ''}`}
                      src={message?.sender?.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${message?.sender?.firstname || ''} ${message?.sender?.lastname || ''}`}
                    secondary={
                      <React.Fragment>

                        {`${message?.datetime}`}
                        <Typography
                          // sx={{ display: 'inline' }}
                          component="p"
                          variant="body2"
                          color="text.primary"
                        >
                          {`${message?.message}`}

                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </>
            )
        }

        <div ref={ref}></div>
      </List>
      <Stack
        px={3}
        mb={3}
        mt={1}
        direction={'row'}
        alignItems={'center'}
      >
        <TextField
          sx={{ flex: 1 }}
          id="outlined-multiline-static"
          label="Write Message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={3}
        // defaultValue="Default Value"
        />

        <Button
          onClick={() => sendMessages()}
          sx={{ ml: 1 }}
          color='success'
          variant="contained"
          size='medium'
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </Stack>
    </Container>

  );
}