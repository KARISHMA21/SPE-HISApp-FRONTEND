import * as React from 'react';
import Consents from "./Consents";

import { useNavigate, useParams } from 'react-router-dom';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function ViewConsentLog() {

    const nav=useNavigate();
    const {did, name} = useParams();
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
                    {/*<ThemeProvider theme={theme}>*/}
                        <Container component="main" maxWidth="lg">
                            <CssBaseline />
                            <h3><i>Your Consents List</i></h3>
                            <Consents did={did} token={token}/>
                        </Container>
                    {/*</ThemeProvider>*/}
                </div>
            </div>


        </div>
    )
}

export default ViewConsentLog;