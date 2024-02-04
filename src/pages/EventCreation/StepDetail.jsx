import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Chip, Stack, TextField, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';

export default function StepDetail({ eventDetails, setEventDetails }) {


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission, e.g., send data to the server
    console.log('Form submitted:', eventDetails);
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          mb: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Details of ketch-up
        </Typography>
        <Box>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            name="eventName"
            value={eventDetails.eventName}
            onChange={handleChange}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
            <DateTimePicker
              label="Date and Time"
              slotProps={{ textField: { fullWidth: true } }}
              name="eventDate"
              value={eventDetails.eventDate}
              defaultValue={null}
              onAccept={(value) => {
                console.log(value);
                handleChange({
                  target: { name: "eventDate", value: value }
                })
              }}
              sx={{ mt: 3 }}
            />
          </LocalizationProvider>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            name="eventLocation"
            value={eventDetails.eventLocation}
            onChange={handleChange}
            sx={{ mt: 3 }}

          />

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            name="eventDescription"
            value={eventDetails.eventDescription}
            onChange={handleChange}
            multiline
            rows={4}
            sx={{ mt: 3 }}

          />
        </Box>

      </Box>
    </Container>
  );
}