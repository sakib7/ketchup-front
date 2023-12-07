import { useState, Fragment, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { StepContent } from '@mui/material';
import StepInterest from './StepInterest';
import StepPlace from './StepPlace';
import StepDetail from './StepDetail';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../components/auth/axiosInstance';
import dayjs from 'dayjs';

const steps = ['Interest', 'Place', 'Details'];

export default function HorizontalLinearStepper({ isEdit }) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [interest, setInterest] = useState("");
  const [place, setPlace] = useState({});
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    eventDate: null,
    eventLocation: '',
    eventDescription: ''
  });
  const { eventId } = useParams();
  useEffect(() => {
    if (isEdit) {
      getEvent()
    }
  }, [])
  const navigate = useNavigate();
  const defaultTheme = createTheme({
    palette: {
      customColor: {
        main: '#eeff41', // Replace with your desired custom color
      },
      primary: {
        main: '#FFCF60'
      }
    },
  });

  const getEvent = async () => {
    try {
      const response = await axiosInstance.get(`/ketchups/${eventId}`);
      if (response.status === 200) {
        console.log(response.data);
        setInterest(response.data.category)
        setEventDetails({
          eventName: response.data.name,
          eventDate: dayjs(response.data.datetime),
          eventLocation: response.data.address,
          eventDescription: response.data.description
        })
      }
    } catch (error) {
      console.error(error);
    }
  }


  const isStepOptional = (step) => {
    // return step === 1;
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    if (activeStep === steps.length - 1) {
      isEdit ? updateEvent() : createEvent()
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const createEvent = async () => {
    try {
      const data = {
        "category": interest,
        "address": eventDetails.eventLocation,
        "description": eventDetails.eventDescription,
        "name": eventDetails.eventName,
        "datetime": eventDetails.eventDate
      }
      const response = await axiosInstance.post('/ketchups', data);
      if (response.status === 201) {
        navigate("/events")

      }
      // const { access } = response.data;
      // login(access);

    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  const updateEvent = async () => {
    try {
      const data = {
        "category": interest,
        "address": eventDetails.eventLocation,
        "description": eventDetails.eventDescription,
        "name": eventDetails.eventName,
        "datetime": eventDetails.eventDate
      }
      const response = await axiosInstance.put(`/ketchups/${eventId}`, data);
      if (response.status === 200) {
        navigate("/events")

      }
      // const { access } = response.data;
      // login(access);

    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box sx={{
          marginTop: 4,
          marginBottom: 8,
          width: '100%'
        }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                {/* All steps completed - you&apos;re finished */}
                Something went wrong. Try again please.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </Fragment>
          ) : (
            <Fragment>
              {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
              {
                activeStep === 0 &&
                <StepInterest interest={interest} setInterest={setInterest} />
              }
              {
                activeStep === 1 &&
                <StepPlace place={place} setPlace={setPlace} />
              }
              {
                activeStep === 2 &&
                <StepDetail eventDetails={eventDetails} setEventDetails={setEventDetails} />
              }
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}

                <Button onClick={handleNext} variant='contained'>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </Fragment>
          )}
        </Box>
      </Container>
    </ThemeProvider>

  );
}
