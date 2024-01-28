
import { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  // Checkbox,
  // Divider,
  FormControl,
  // FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
// import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
  let baseURL =
    process.env.NODE_ENV === 'production'
      ? '' // production
      : 'http://localhost:3000';//5000

  const theme = useTheme();

  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  // const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  // const [checked, setChecked] = useState(true);
  const [captchaError, setCaptchaError] = useState('');

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  // const googleHandler = async () => {
  //   console.error('Register');
  // };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNameBlur = () => {
    if (name.trim() === '') {
      setNameError('Name is required');
    } else {
      setNameError('');
    }
  };

  const onChange = async (value) => {
    try {
      const res = await axios.post(`${baseURL}/captcha`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
        credentials: 'same-origin',
        body: value
      });

      if (res.status !== 200) {
        setCaptchaError('CAPTCHA verification failed. Please try again.');
      } else {
        setCaptchaError('');
      }
    } catch (e) {
      setCaptchaError('Error occurred while verifying CAPTCHA.');
    }
  };

  let siteKey =
    process.env.NODE_ENV === 'production' ? '6LdisJogAAAAANcrgQuKQ4a5CrZD0n7RDseTay6Z' : '6LdGGDEfAAAAAGpNHRw7ixtzefcYzj4GOJW6TaD7';

  return (
    <>
      {/* <ToastContainer theme='colored' autoClose = {2000} position="top-right"/> */}
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ alignItems: 'center', display: 'flex' }}></Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });

              // Handle form submission to the backend
              if (name && values.email && values.password) {
                const formData = {
                  name,
                  email: values.email,
                  password: values.password
                };

                try {
                  const response = await axios.post(`${baseURL}/register`, formData);
                  if (response.status == 200) {
                    setErrors({ submit: response.data.message });
                    setStatus({ success: true });
                    setSubmitting(false);
                  }
                } catch (error) {
                  if (error.response) {
                    // Handle error response from the server
                    setErrors({ submit: error.response.data.errors });
                    setSubmitting(false);
                  } else {
                    // Handle other errors
                    setErrors({ submit: 'An error occurred while submitting the form' });
                    setSubmitting(false);
                  }
                }
              } else {
                setErrors({ submit: 'Please fill all fields' });
                setSubmitting(false);
              }
            }
          } catch (error) {
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: error.message });
              setSubmitting(false);
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form action="/register" method="POST" noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={24} sm={12}>
                <TextField
                  fullWidth
                  label="Name"
                  margin="normal"
                  name="fname"
                  type="text"
                  value={name}
                  onBlur={handleNameBlur}
                  onChange={handleNameChange}
                  error={Boolean(nameError)}
                  helperText={nameError}
                  sx={{ ...theme.typography.customInput }}
                />
              </Grid>
            </Grid>

            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Grid item>
              <ReCAPTCHA
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px', marginBottom: '10px' }}
                theme="light"
                sitekey={siteKey}
                onChange={onChange}
              />
              {captchaError && (
                <Typography variant="caption" color="error">
                  {captchaError}
                </Typography>
              )}
            </Grid>

            <Grid container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px', marginBottom: '10px' }}>
              <Grid item>
                <Typography variant="subtitle1">
                  By signing up you agree with our&nbsp;
                  <a href="#" target="_blank" rel="noreferrer">
                    Terms & Condition.
                  </a>
                </Typography>
              </Grid>
            </Grid>
            {errors.submit && (
              <Typography variant="body2" color="error" sx={{ mt: 3, textAlign: 'center' }}>
                {errors.submit}
              </Typography>
            )}
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: 'rgb(85, 79, 232)' }}
                >
                  Sign up
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseRegister;