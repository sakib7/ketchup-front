// src/AuthProvider.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../auth/AuthContext.jsx';
import SignUp from '../../pages/Register.jsx'
import CardList from '../../pages/CardList.jsx'
import Login from '../../pages/Login.jsx'
import Register from '../../pages/Register.jsx'
import EventStepper from '../../pages/EventCreation/EventStepper.jsx'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import AppBarNav from './AppBarNav.jsx';
import BottomNav from './BottomNav.jsx';
import ProfileView from '../../pages/ProfileView.jsx';
import EventPage from '../../pages/EventPage.jsx';
import ProfileViewBusiness from '../../pages/ProfileViewBusiness.jsx';
import ProfileEditBusiness from '../../pages/ProfileEditBusiness.jsx';
import ProfileEdit from '../../pages/ProfileEdit.jsx';

const PrivateRoute = ({ element }) => {
  const { token } = useAuth();

  return token ? element : <Navigate to="/login" />;
};


const AppRouter = () => {
  const defaultTheme = createTheme({
    palette: {
      customColor: {
        main: '#01658c', // Replace with your desired custom color
      },
      primary: {
        main: '#FFCF60'
      }
    },
  });
  return (
    <AuthProvider>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Router>
          <AppBarNav />
          <div>
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              {/* <Route path="/about" element={<About />} /> */}
              <Route path="/events" element={<PrivateRoute element={<CardList myEvents={true} />} />} />
              <Route path="/explore" element={<CardList />} />
              <Route path="/" element={<CardList />} />
              <Route path="/events/:eventId" element={<EventPage />} />
              <Route path="/update-event/:eventId" element={<PrivateRoute element={<EventStepper isEdit={true} />} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create-event" element={<PrivateRoute element={<EventStepper />} />} />
              <Route
                path="/profile"
                element={<PrivateRoute element={<ProfileView />} />}
              />
              <Route
                path="/edit-profile" element={<ProfileEdit />}
              />
              <Route
                path="/profile-business" element={<ProfileViewBusiness />}
              />
              <Route
                path="/edit-profile-business" element={<ProfileEditBusiness />}
              />
            </Routes>
          </div>
          <BottomNav />
        </Router>

      </ThemeProvider>

    </AuthProvider>
  );
};

export default AppRouter;
