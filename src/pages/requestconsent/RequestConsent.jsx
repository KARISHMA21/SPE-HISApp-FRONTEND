import React from 'react'
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import {useNavigate, useParams} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Notify from "../../components/notification/Notify";
import AddConsents from './AddConsents'
function RequestConsent() {
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
            {console.log(token)}
                <Topbar did={did} name={name} />
                <div className="container">
                    <Sidebar did={did} name={name}/>
                    <div className="moveright">
                        <ThemeProvider theme={theme}>
                            <Container component="main" maxWidth="lg">
                                <CssBaseline />
                                <h3><i>Create a new consent request </i></h3>
                                <div style={{marginLeft:600,marginTop:-80}}> <Notify/></div>
                                <br/>
                                <AddConsents did={did} name={name} token={token}/>
                                {/*<AddConsents did={did} name={name} token={token}/>*/}
                            </Container>
                        </ThemeProvider>
                    </div>
                    </div>
                </div>
            )
}

export default RequestConsent