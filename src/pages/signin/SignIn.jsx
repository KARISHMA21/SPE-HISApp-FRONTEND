import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import doctor_login from '../../services/SignIn';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from '@mui/material/Grid';


import Paper from '@mui/material/Paper';
const theme = createTheme();
export default function SignIn() {
  let nav=useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const bodyParameters ={
      username: data.get('id'),
      password: data.get('password'),
    };
    console.log(data.get('id'));
      console.log(data.get('password'));
  let token =localStorage.getItem(data.get('id'))

  doctor_login.login(bodyParameters,token)
  .then((response) => {
    console.log(response)
    if (response.status === 200) {
      toast.success("Successfully logged in!!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      localStorage.setItem(response.data['id'],response.data['token'])
        window.localStorage.setItem(response.data['id']+"-"+response.data['token'],response.data['id']+"-"+response.data['role'])
      nav(`/home/${response.data['id']}/${response.data['name']}`);
        // ${response.data['id']}
    
    }
    
  })
  .catch((error) => {
    toast.error("Error Logging In!!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    nav("/")
  });

  };

  return (


<> <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://tateeda.com/wp-content/uploads/2021/02/TITLE-6.jpg)',
            backgroundRepeat: 'no-repeat',
            borderBlock:5,
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
           
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

<Typography component="h1" variant="h5"  sx={{ mt: 15 }}>
            Welcome To {process.env.REACT_APP_HOSPITAL_NAME}!
            </Typography>
          
           
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 8 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="Employee ID"
              name="id"
              autoComplete="none"
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
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
             
            </Box>
          </Box>
        </Grid>
      </Grid>
    
      <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
    </ThemeProvider>

    </>
  );
}