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
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Paper from '@mui/material/Paper';
const theme = createTheme();
export default function Unauthorized() {
  let nav=useNavigate();

  toast.error("Redirecting!!", {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  setTimeout(() => {
    nav("/");
    }, 1000); // 5000 ms = 5 seconds
  

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
            borderBlock:100,

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

<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
            Unauthorized Access
            </Typography>

        
                   
            <Box component="form"  noValidate sx={{ mt: 8 }}>
              <Typography component="h3" variant="h6">
            Your account does not have access to this page.
            
            </Typography>
            <Typography component="h3" variant="h10">
           Redirecting to Login Page!!
            
            </Typography>
           
           
             
         
             
            </Box> 
          </Box>
        </Grid>
      </Grid>
      {/* <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            /> */}
    
    </ThemeProvider>

    </>
  );
}