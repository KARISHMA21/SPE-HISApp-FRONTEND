
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import  { useEffect } from 'react'
import "./home.css";
import '../generateprescription/addrecords.css'
import WidgetLg from "../../components/widgetLg/WidgetLg";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
export default function Home() {

    const {did, name} = useParams();
    const theme = createTheme();

    const nav=useNavigate();
    let token=localStorage.getItem(did)
    // let loggedInRole=localStorage.getItem(did+"role")
    // let activetoken=localStorage.getItem(did)
    let loggedInRole=localStorage.getItem(did+"-"+token)
    let roleAdmin=did+"-ADMIN"
    let roleDoctor=did+"-DOCTOR"

    useEffect(() => {
        if(token==null || (loggedInRole !== roleAdmin && loggedInRole !== roleDoctor)
        ){
            console.log("loggedInRole"+loggedInRole
                // , "Role"+role
            );
            localStorage.removeItem(did);
            localStorage.removeItem(did+"-"+token);
            nav('/unauthorized');
        }
    }, [])
    return (

        <div>
            <Topbar  did={did} name={name}/>
            <div className="container" style={{overflowX:"hidden"}}>
                <Sidebar did={did} name={name}/>

                <div className="moveright">
                    {/* <div className="home"> */}

                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="lg">
                            <CssBaseline />

                            <div className="homeWidgets">

                                <WidgetLg/>
                            </div>

                            {loggedInRole === roleDoctor &&(
                         <div >   <FeaturedInfo /> <br/></div>)}

                        </Container>
                    </ThemeProvider>
                </div>
            </div>
        </div>

    );
}
