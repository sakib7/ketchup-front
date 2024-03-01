import { useState, useRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Chip, Stack, TextField, Button, Card, CardMedia } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import ReactQuill from 'react-quill';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function StepDetail({ eventDetails, setEventDetails }) {

  const imageInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);

  const handleQuill = (val) => {
    setEventDetails({
      ...eventDetails,
      'eventDescription': val,
    });
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const targetName = e.target.name
    console.log(targetName);
    setImageFile(imageFile)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventDetails({
          ...eventDetails,
          image: reader.result,
          imageFile: file
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
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
          <Typography gutterBottom variant="h6"
            fontSize={16} textAlign={'left'}
            my={2} component="div">
            Event Image
          </Typography>
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
              size='small'
              onClick={handleImageClick}
              startIcon={<CloudUploadIcon />}
            >
              Upload Image
            </Button>
            {eventDetails.image &&
              <Card sx={{ maxWidth: '100%' }}>
                <CardMedia
                  component="img"
                  height="undefined"
                  src={eventDetails.image}
                  alt="green iguana"
                />
              </Card>
            }



          </Stack>

          <Typography gutterBottom variant="h6"
            fontSize={16} textAlign={'left'}
            my={2} component="div">
            Description
          </Typography>

          <ReactQuill
            style={{
              height: '350px'
            }}
            value={eventDetails.eventDescription}
            onChange={handleQuill}
            modules={{
              toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['link'],
                ['clean']
              ],
            }}
            formats={[
              'header',
              'bold', 'italic', 'underline', 'strike', 'blockquote',
              'list', 'bullet', 'indent',
              'link',
            ]} />
        </Box>

      </Box>
    </Container>
  );
}