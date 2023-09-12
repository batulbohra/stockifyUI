import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from './UserSlice';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { selectUser } from './UserSlice';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const baseURL = process.env.REACT_APP_BASE_URL;
export default function SignIn() {

  const user = useSelector(selectUser);
  const navigate= useNavigate();
  useEffect(() => {
    if(user ) {
      console.log("userExists");
      navigate('/home/dashboard')}
  }, []);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    handleSignInApi(data);
  };
  const dispatch = useDispatch();
  const handleSignInApi = async (data) => {
    try {
      const formData = {
        email:data.get('email'),
        password: data.get('password'),
      };
      // Replace 'YOUR_API_ENDPOINT' with the actual URL of your sign-in API endpoint
      const response = await axios.post(`${baseURL}/api/user/login`, formData);
  
      // Handle the response here (e.g., store user data in state or local storage)
      await console.log('Sign-in successful:', response.data);
      if(response.data && response.data.status =="Verified" ){
        let userInfo=response.data.userInfo;
        dispatch(
          login({
          name: userInfo.firstName+" "+userInfo.lastName,
          email: userInfo.email,
          balance: userInfo.balance,
          loggedIn: true,
          })
        );
        navigate("/home/holding")
      }else{
          navigate('/signup');
      }
  
      // Redirect to another page or perform other actions as needed
    } catch (error) {
      // Handle API error (e.g., display an error message)
      console.error('Sign-in error:', error);
    }
  };
  

  return (
    <div>
    
    
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link to='/signup'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </div>
  );
}