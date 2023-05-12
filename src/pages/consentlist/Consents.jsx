import * as React from 'react';
import Box from '@mui/joy/Box';
// import Box from '@mui/material/Box';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Tab from '@mui/joy/Tab';
import ConsentLogsService from "../../services/ConsentLogsService";
import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as moment from "moment/moment";
import Button from "@mui/material/Button";
import delegateConsent from "../../services/DelegateConsentService";
import {toast} from "react-toastify";

// import Container from '@mui/material/Container';
// // import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';

export default function Consents(props) {
  // const theme = createTheme();

  const id=props.did;
  // const name=props.name;
  const token=props.token;
  const eid=process.env.REACT_APP_HOSPITAL_ID;
  console.log(eid);
  // const did='D01';

  const [index, setIndex] = useState(0);
  const [reqrecords, setData] = useState([]);
  const [ConsentData, setConsentData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [delegateConsentData, setDelegateConsentData] = useState([]);
const handleDelegate=async(id,cid)=>{
  // setLoading(true)
  // delegateConsentData({
  //   'new_accessor_id':'',
  //   'new_accessor_name':'',
  //   'old_accessor_id':id,
  //   'cid':cid,
  // })
  const delegateConsentData={
    'new_accessor_id':'',
    'new_accessor_name':'',
    'old_accessor_id':id,
    'cid':cid,
  }
  console.log(delegateConsentData)
  await delegateConsent.senddelegateconsentrequest(token,delegateConsentData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Successfully delegated the Request!!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          window.location.reload(true)
        } else {
          toast.warn("Could not delegate the Request!!", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          return;
        }
      })
  // setLoading(false)
};
  const fetchPendingRequests = async () => {
    // const response = await fetch('your-api-endpoint-url');
    setLoading(true);
    try {
      // Make API call and update data state
      // console.log(did,pid);
      const response = await ConsentLogsService.getPendingRequests(id,eid,token);
      console.log(response);
      const res = response.data;
      console.log(res); // Add this line

      setData(res.pendingRequests);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {

    fetchPendingRequests();
  }, []);

  const fetchConsentLog= async () => {
    // const response = await fetch('your-api-endpoint-url');
    setLoading(true);
    try {
      // Make API call and update data state
      // console.log(did,pid);
      const response = await ConsentLogsService.getConsentLog(id,eid,token);
      console.log(response);
      const res = response.data;
      console.log(res); // Add this line

      setConsentData(res.consentLogs);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const activeConsents = ConsentData.filter(request => request.status === 'Active');
  const inactiveConsents = ConsentData.filter(request => request.status === 'Expired' || request.status === 'Rejected');
  const emergencyConsents = ConsentData.filter(request => request.status === 'Emergency');

  const handleTabClick = (event, value) => {
    if (value === 0) {

      console.log("Selected Pending requests")
      fetchPendingRequests();
    }
    else if (value === 1) {
      // fetchPendingRequests();
      fetchConsentLog();
      console.log("Selected Active Consents")
    }
    else if (value === 2) {
      // fetchPendingRequests();
      fetchConsentLog();
      console.log("Selected Rejected/Expired Consents")
    }
    setIndex(value);
  }
  return (
      // <div >

      <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>

         <Tabs
        aria-label="Soft tabs"
        value={index}
        // onChange={(event, value) => setIndex(value)}
        // onClick={(event:, value) => setIndex(value)}
        onChange={handleTabClick}
        sx={{ borderRadius: 'lg' }}
      >
        <TabList variant="soft">
          <Tab
            variant={index === 0 ? 'solid' : 'plain'}
            color={index === 0 ? 'primary' : 'neutral'}
          >
            Pending Requests
          </Tab>
          <Tab
            variant={index === 1 ? 'solid' : 'plain'}
            color={index === 1 ? 'primary' : 'neutral'}
          >
            Active Consents
          </Tab>
          <Tab
            variant={index === 2 ? 'solid' : 'plain'}
            color={index === 2 ? 'primary' : 'neutral'}
          >
            Rejected/Expired Consents
          </Tab>
          <Tab
              variant={index === 3 ? 'solid' : 'plain'}
              color={index === 3 ? 'primary' : 'neutral'}
          >
           Emergency Consents
          </Tab>
        </TabList>
           <TabPanel value={0} sx={{ p: 2 }}>
             {!loading && reqrecords.length==0?<>No Pending Requests Present</>:<></>}
             {!loading && reqrecords.length!==0?
                 ( <TableContainer component={Paper}>
               <Table sx={{ minWidth: 550}} aria-label="simple table">
                 <TableHead sx={{ backgroundColor:"whitesmoke" }}>
                   <TableRow>
                     <TableCell align="left"
                                // sx={{ fontWeight: 'bold' }}
                     >REQUEST ID</TableCell>
                     <TableCell align="left"
                                // sx={{ fontWeight: 'bold' }}
                     >REQUEST DATE</TableCell>
                     <TableCell align="left"
                                // sx={{ fontWeight: 'bold' }}
                     >PATIENT ID</TableCell>
                     <TableCell align="center"
                                // sx={{ fontWeight: 'bold' }}
                     >RECORDS DATERANGE</TableCell>
                     <TableCell align="center"
                                // sx={{ fontWeight: 'bold' }}
                     >REQUESTED TAGS</TableCell>
                     <TableCell align="left"
                                // sx={{ fontWeight: 'bold' }}
                     >REASON</TableCell>
                     <TableCell align="left"
                         // sx={{ fontWeight: 'bold' }}
                     ></TableCell>
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
                         <TableCell align="center">{row.pid}</TableCell>
                         <TableCell align="center" component="th" scope="row">
                           {
                             // moment(row.gen_date).format('DD/MM/YYYY')
                             moment(row.from_date).format("MMMM D, YYYY")+ " - "+
                             moment(row.to_date).format("MMMM D, YYYY")

                           }
                         </TableCell>
                         <TableCell align="center">
                           <button className='button'>
                           {row.tag1}</button><button className='button'>
                           {row.tag2}</button><button className='button'>
                           {row.tag3}</button>
                         </TableCell>

                         <TableCell align="left">{row.reason}</TableCell>
                         {/*<TableCell align="left">Dr. {row.requestor_ename}</TableCell>*/}
                         {/*<TableCell align="left">{row.requestor_eid+" "+row.etype}</TableCell>*/}
                       </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </TableContainer>
                 ):<></>}
           </TabPanel>
           <TabPanel value={1} sx={{ p: 2 }}>
             {/*<b>Second</b> tab panel*/}
             {!loading && activeConsents.length==0?<>No Active Consents Present</>:<></>}
             {!loading && activeConsents.length!==0?
                 (<TableContainer component={Paper}>
               <Table sx={{ minWidth: 550}} aria-label="simple table">
                 <TableHead sx={{ backgroundColor:"whitesmoke" }}>
                   <TableRow>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >CONSENT ID</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >CREATE DATE</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >PATIENT ID</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >CONSENT VALIDITY</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >LAST UPDATED ON</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >APPROVED BY</TableCell>
                     <TableCell align="left"
                         // sx={{ fontWeight: 'bold' }}
                     >REASON</TableCell>
                     <TableCell align="left"
                         // sx={{ fontWeight: 'bold' }}
                     > DELEGATE CONSENT</TableCell>
                   </TableRow>
                 </TableHead>

                 <TableBody sx={{ backgroundColor:"white" }}>
                   { !loading && activeConsents.map((request) => (
                       <TableRow
                           key={request.cid}
                           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                       >
                         <TableCell align="center">{request.cid}</TableCell>
                         <TableCell align="center" component="th" scope="row">
                           {
                             // moment(row.gen_date).format('DD/MM/YYYY')
                             moment(request.create_date).format("MMMM D, YYYY")

                           }
                         </TableCell>
                         <TableCell align="center">{request.pid}</TableCell>
                         <TableCell align="center" component="th" scope="row">
                           {
                             // moment(row.gen_date).format('DD/MM/YYYY')
                               moment(request.expiry_date).format("MMMM D, YYYY")
                           }
                         </TableCell>
                         <TableCell  align="center" component="th" scope="row">
                           {
                             // moment(row.gen_date).format('DD/MM/YYYY')
                             moment(request.last_update).format("MMMM D, YYYY")
                           }
                         </TableCell>
                         <TableCell align="center">{request.action_taken_by}</TableCell>
                         <TableCell align="left">{request.reason}</TableCell>
                         <TableCell align="left"><Button variant="contained" color="success" onClick = {() => {handleDelegate(id,request.cid)
                       }}>Delegate</Button></TableCell>
                       </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </TableContainer>
             ):<></>}
           </TabPanel>
           {/*Rejected tab*/}
           <TabPanel value={2} sx={{ p: 2 }}>
             {/*<b>Third</b> tab panel*/}
             {!loading && inactiveConsents.length==0?<>No Inactive Consents Present</>:<></>}
             {!loading && inactiveConsents.length!==0?
                 (<TableContainer component={Paper}>
               <Table sx={{ minWidth: 550}} aria-label="simple table">
                 <TableHead sx={{ backgroundColor:"whitesmoke" }}>
                   <TableRow>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >CONSENT ID</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >CREATE DATE</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >PATIENT ID</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >CONSENT VALIDITY</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >DEACTIVATED ON</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >ACTION TAKEN BY</TableCell>
                     <TableCell align="left"
                         // sx={{ fontWeight: 'bold' }}
                     >CONSENT REASON</TableCell>
                   </TableRow>
                 </TableHead>
                 <TableBody sx={{ backgroundColor:"white" }}>
                   { !loading && inactiveConsents.map((request) => (
                       <TableRow
                           key={request.cid}
                           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                       >
                         <TableCell align="center">{request.cid}</TableCell>
                         <TableCell align="center" component="th" scope="row">
                           {
                             // moment(row.gen_date).format('DD/MM/YYYY')
                             moment(request.create_date).format("MMMM D, YYYY")

                           }
                         </TableCell>
                         <TableCell align="center">{request.pid}</TableCell>
                         <TableCell align="center" component="th" scope="row">
                           {
                             // moment(row.gen_date).format('DD/MM/YYYY')
                             moment(request.expiry_date).format("MMMM D, YYYY")
                           }
                         </TableCell>
                         <TableCell align="center" component="th" scope="row">
                           {
                             // moment(row.gen_date).format('DD/MM/YYYY')
                             moment(request.last_update).format("MMMM D, YYYY")
                           }
                         </TableCell>
                         <TableCell align="center">{request.action_taken_by}</TableCell>

                         <TableCell align="left">{request.reason}</TableCell>
                         {/*<TableCell align="left">Dr. {row.requestor_ename}</TableCell>*/}
                         {/*<TableCell align="left">{row.requestor_eid+" "+row.etype}</TableCell>*/}
                       </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </TableContainer>
                 ):<></>}
           </TabPanel>
           <TabPanel value={3} sx={{ p: 2 }}>
             {/*<b>Second</b> tab panel*/}
             {!loading && emergencyConsents.length==0?<>No Emergency Consents Present</>:<></>}

             {!loading && emergencyConsents.length!==0?

                 (<TableContainer component={Paper}>
               <Table sx={{ minWidth: 550}} aria-label="simple table">
                 <TableHead sx={{ backgroundColor:"whitesmoke" }}>
                   <TableRow>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >CONSENT ID</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >CREATE DATE</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >PATIENT ID</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >CONSENT VALIDITY</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >LAST UPDATED ON</TableCell>
                     <TableCell align="center"
                         // sx={{ fontWeight: 'bold' }}
                     >APPROVED BY</TableCell>
                     <TableCell align="left"
                         // sx={{ fontWeight: 'bold' }}
                     >REASON</TableCell>
                     <TableCell align="left"
                         // sx={{ fontWeight: 'bold' }}
                     > DELEGATE CONSENT</TableCell>
                   </TableRow>
                 </TableHead>

                 <TableBody sx={{ backgroundColor:"white" }}>
                   { !loading && emergencyConsents.map((request) => (
                       <TableRow
                           key={request.cid}
                           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                       >
                         <TableCell align="center">{request.cid}</TableCell>
                         <TableCell align="center" component="th" scope="row">
                           {
                             // moment(row.gen_date).format('DD/MM/YYYY')
                             moment(request.create_date).format("MMMM D, YYYY")

                           }
                         </TableCell>
                         <TableCell align="center">{request.pid}</TableCell>
                         <TableCell align="center" component="th" scope="row">
                           {
                             // moment(row.gen_date).format('DD/MM/YYYY')
                             moment(request.expiry_date).format("MMMM D, YYYY")
                           }
                         </TableCell>
                         <TableCell  align="center" component="th" scope="row">
                           {
                             // moment(row.gen_date).format('DD/MM/YYYY')
                             moment(request.last_update).format("MMMM D, YYYY")
                           }
                         </TableCell>
                         <TableCell align="center">{request.action_taken_by}</TableCell>
                         <TableCell align="left">{request.reason}</TableCell>
                         <TableCell align="left"><Button onClick = {() => {handleDelegate(id,request.cid)
                         }}>Delegate</Button></TableCell>
                         {/*<TableCell align="left">Dr. {row.requestor_ename}</TableCell>*/}
                         {/*<TableCell align="left">{row.requestor_eid+" "+row.etype}</TableCell>*/}
                       </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </TableContainer>
               ):<></>}
           </TabPanel>
      </Tabs>
      </Box>

      // </div>
  );
}
