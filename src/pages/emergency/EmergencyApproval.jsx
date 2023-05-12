
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import {useEffect, useState} from 'react'
import '../generateprescription/addrecords.css'
import WidgetLg from "../../components/widgetLg/WidgetLg";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as moment from "moment/moment";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import approvals from  "../../services/EmergencyApproval";
import Button from "@mui/material/Button";
import {toast} from "react-toastify";


export default function EmergencyApproval() {
    const {did, name} = useParams();
    const superdid=did;
    const [loading, setLoading] = useState(true);
    const [reqrecords, setData] = useState([]);
    const theme = createTheme();
    const eid=process.env.REACT_APP_HOSPITAL_ID;
    const nav=useNavigate();
    let token=localStorage.getItem(did)
    // let loggedInRole=localStorage.getItem(did+"role")
    // let activetoken=localStorage.getItem(did)
    let loggedInRole=localStorage.getItem(did+"-"+token)
    let roleAdmin=did+"-ADMIN"
    let roleDoctor=did+"-DOCTOR"
    const handleAccept=async(id)=>{
        const action={
            "action":"Emergency",
        }
        console.log(action)
        await approvals.approvePendingRequests(id,token,action)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Accepted the emergency consent")
                    // action={
                    //     "action":" ",
                    // }
                    console.log("response here"+response)
                }
            })
        window.location.reload(true)
    }

const handleReject=async(id)=>{
    const action={
        "action":"Rejected",
    }
    console.log(action)
    await approvals.rejectPendingRequests(id,token,action)
        .then((response) => {
            if (response.status === 200) {
                toast.success("Rejected the emergency consent")
                // action={
                //     "action":" ",
                // }
                console.log("action here"+action)
            }
        })
    window.location.reload(true)
}

    const fetchPendingRequests = async () => {
        setLoading(true);
        try {
            // Make API call and update data state
            const response = await approvals.getPendingRequests(superdid,token);
            console.log(response.data);
            const res = response;
            console.log(res); // Add this line
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };
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
        fetchPendingRequests();
    }, [])
    return (

        <div>
            <Topbar  did={did} name={name}/>
            <div className="container" style={{overflowX:"hidden"}}>
                <Sidebar did={did} name={name}/>

                <div className="moveright">

                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="lg">
                            <CssBaseline />
                            <h3><i>Emergency Approvals</i></h3>
                            {!loading && reqrecords.length==0?<>No Emergency Requests Present</>:<></>}

                            {!loading && reqrecords.length!==0?
                                <TableContainer component={Paper} sx={{overflow:"hidden",width:"100%"}}>
                                <Table sx={{ width:"100%"}} aria-label="simple table">
                                    <TableHead sx={{ backgroundColor:"whitesmoke" }}>
                                        <TableRow>
                                            <TableCell align="left"
                                                // sx={{ fontWeight: 'bold' }}
                                            >Request ID</TableCell>
                                            <TableCell align="left"
                                                // sx={{ fontWeight: 'bold' }}
                                            >Request Date</TableCell>
                                            <TableCell align="left"
                                                // sx={{ fontWeight: 'bold' }}
                                            >Patient ID</TableCell>
                                            <TableCell align="left"
                                                // sx={{ fontWeight: 'bold' }}
                                            >Requestor ID</TableCell>
                                            <TableCell align="left"
                                                // sx={{ fontWeight: 'bold' }}
                                            >Requestor Name</TableCell>
                                            <TableCell align="center"
                                                // sx={{ fontWeight: 'bold' }}
                                            >Records Datarange</TableCell>
                                            <TableCell align="center"
                                                // sx={{ fontWeight: 'bold' }}
                                            >Requested Tags</TableCell>
                                            <TableCell align="left"
                                                // sx={{ fontWeight: 'bold' }}
                                            >Reason</TableCell>
                                            <TableCell align="left"
                                                // sx={{ fontWeight: 'bold' }}
                                            > Requestor Hospital </TableCell>
                                            <TableCell align="left"
                                                // sx={{ fontWeight: 'bold' }}
                                            > Expiry DATE </TableCell>
                                            <TableCell align="left"
                                                sx={{maxWidth:"250px" }}
                                            > Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ backgroundColor:"white" }}>
                                        { !loading && reqrecords.map((row) => (
                                            <TableRow
                                                key={row.pendingRequestId}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">{row.pendingRequestId}</TableCell>
                                                <TableCell component="th" scope="row">
                                                    {
                                                        // moment(row.gen_date).format('DD/MM/YYYY')
                                                        moment(row.request_date).format("MMMM D, YYYY")

                                                    }
                                                </TableCell>
                                                <TableCell style={{maxWidth:"150px"}}  align="center">{row.pid}</TableCell>

                                                <TableCell style={{maxWidth:"150px"}}align="left">{row.requestor_id}</TableCell>
                                                <TableCell align="center" component="th" scope="row">
                                                    {row.requestor_name}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {
                                                        // moment(row.gen_date).format('DD/MM/YYYY')
                                                        moment(row.from_date).format("MMMM D, YYYY")+ " - "+
                                                        moment(row.to_date).format("MMMM D, YYYY")

                                                    }</TableCell>

                                                <TableCell align="center">
                                                    <button className='button'>
                                                        {row.tag1}</button><button className='button'>
                                                    {row.tag2}</button><button className='button'>
                                                    {row.tag3}</button>
                                                </TableCell>
                                                <TableCell align="left">{row.reason}</TableCell>
                                                <TableCell align="left">Dr. {row.requestor_ename}</TableCell>
                                                <TableCell align="left"> {moment(row.expiry_date).format("MMMM D, YYYY")}</TableCell>
                                                <TableCell sx={{maxWidth:"250px",justifyItems:"center"}}align="left"><Button sx={{width:"100px"}}variant="contained" color="success" onClick={(e) =>  {e.stopPropagation();handleAccept(row.pendingRequestId)}}>Approve</Button>
                                                 <Button variant="outlined" color="error"

                                                                 sx={{marginTop:2,width:"100px"}}
                                                                 onClick={(e) =>  {e.stopPropagation();handleReject(row.pendingRequestId)}}>Reject</Button> </TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            :<></>}
                            <br/>
                        </Container>
                    </ThemeProvider>
                </div>
            </div>
        </div>

    );
}
