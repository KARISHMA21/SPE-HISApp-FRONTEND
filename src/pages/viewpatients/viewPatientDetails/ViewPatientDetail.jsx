// import { DataGridPremium } from '@mui/x-data-grid-premium';

import * as React from 'react';
import PatientDetails from './PatientDetails.jsx';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate, useParams } from 'react-router-dom';
import Topbar from '../../../components/topbar/Topbar.jsx';
import Sidebar from '../../../components/sidebar/Sidebar.jsx';
import Notify from '../../../components/notification/Notify.jsx';


function ViewPatientDetail() {
  const nav=useNavigate();
  const {did,pid, name} = useParams();
  let token=localStorage.getItem(did)
  const theme = createTheme();

  React.useEffect(() => {
    if(token===null){
        nav('/');
    }
}, [])
    return (
      <div>
        
        <Topbar did={did} name={name} />
      <div className="container">
          <Sidebar did={did} name={name}/>

          <div className="moveright">
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
              <CssBaseline /> 
          <h3><i>The Patient details are </i></h3>
          <div style={{marginLeft:600,marginTop:-80}}> <Notify/></div>
<br/>
          { <PatientDetails/>}
      
          </Container>
          </ThemeProvider>
          </div>
          </div>
      </div>
    )
  }
  
  export default ViewPatientDetail;