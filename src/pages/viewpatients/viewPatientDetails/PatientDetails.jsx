import * as React from "react";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ViewPatientDetailsService from "../../../services/ViewPatientDetailsService";
// import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import * as moment from 'moment';
import './PatientDetail.css';


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function PatientDetails() {
  const [expanded, setExpanded] = useState('panel1');
  const [Medrecords, setMedRecords] = useState([]);
  const{did,pid,name}=useParams();
  const eid=process.env.REACT_APP_HOSPITAL_ID;
  const token=localStorage.getItem(did)
    const nav=useNavigate()

  moment.defaultFormat = "DD.MM.YYYY";
  
  const handleChange =  (panel) => async(event,newExpanded
    // event: React.SyntheticEvent,

  ) => {
    // let res=[]
    // let indx=0
    //   setExpanded(newExpanded ? panel : false);
    if (panel==="panel2") {
      try {
        // Make API call and update data state
        console.log(did,pid);

        const medresponse = await ViewPatientDetailsService.getPatientMedData(did,pid,token,eid);
      //   let res=response.data;
      //   // const data = await response.json();
        
      //   console.log(res)
      //   setMedRecords(res);
      //   console.log(response)
      //   console.log(Medrecords)
      // } catch (error) {
      //   console.log(error);
      // }
      // setLoading(false);
      // console.log(medresponse)
      // // let res=medresponse.data['finalRecordsList'];
      // // let res=medresponse.data[0]['finalRecordsList'];
     
      // for(let i=0;i<medresponse.data.length;i++ )
      // {
      //   for(let j=0;j<medresponse.data[i]['finalRecordsList'].length;j++){
      //   res[indx]=(medresponse.data[i]['finalRecordsList'][j])
      //   res[indx]['auto_id']=indx
      //   indx++;
      //   }
        

      // }
      

      // if (Array.isArray(res)) {
      //   const result = res.length;
      //   console.log(result);
      // } else {
      //   console.log('The value is NOT an array');
      // }

      let res=medresponse.data['finalRecordsList'];
      // setCount(res)
    


      for (let i = 0; i <res.length; i++) {
        res[i]['auto_id']=i+1;
      }
       console.log(res)
            
            setMedRecords(res);
          } catch (error) {
            console.log(error);
          }
      
    }
    setLoading(false);


    setExpanded(newExpanded ? panel : false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:' 50%',
    scrollY:true,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    // boxShadow: 24,
    p: 4,
  };

  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ViewPatientDetailsService.getPatientDetails(did,pid,token,eid);
       
        let res=response.data;
          const birthDate = Date.parse(res.dob);
          console.log( birthDate);
          const today = new Date();
          const diff = today - birthDate;
          const ageInYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
          res.age=ageInYears;
          // console.log(diff);
            console.log(res)
        setRecords(res);
        // console.log(response)
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData(); 
  }, []);
const id=pid;

const [itemSelected, setSelected] = useState([])
      

const [modalOpen, setModalOpen] = useState(false)
const handleClose = () => setModalOpen(false);

const openModal = (item) =>{
  
    // console.log(item)
    const Item = Medrecords.filter((obj) => obj.auto_id === item)
    // console.log(Item)
    setSelected(Item)
    setModalOpen(true)
}
// console.log(itemSelected)
  return (
    <>
        <div>

      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>PATIENT DEMOGRAPHICS</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {/* <ListItemIcon>
          <SendIcon />
        </ListItemIcon> */}
            {/* <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar> */}
            <ul style={{ listStyleType: 'circle' }}>
                <li style={{ marginBottom: '0.5em' }}> <strong>PATIENT ID :&emsp;</strong>{records.pid}</li>
                <Divider /> <br></br>
                <li style={{ marginBottom: '0.5em' }}> <strong>PATIENT NAME :&emsp;</strong>{records.name}</li>
                <Divider /> <br></br>
                <li style={{ marginBottom: '0.5em' }}> <strong>GENDER :&emsp;</strong>{records.gender} </li>
                <Divider /> <br></br>
                <li style={{ marginBottom: '0.5em' }}> <strong>AGE :&emsp;</strong> {records.age}</li>
                <Divider /> <br></br>
                <li style={{ marginBottom: '0.5em' }}> <strong>EMAIL ID :&emsp;</strong> {records.email}</li>
                <Divider /> <br></br>
                <li style={{ marginBottom: '0.5em' }}> <strong>PHONE NO :&emsp;</strong> {records.phone}</li>
                <Divider /> <br></br>
                <li style={{ marginBottom: '0.5em' }}> <strong>PATIENT IS MINOR? :&emsp;</strong> {records.minor_incapacitated}</li>
                <Divider /> <br></br>
                <li style={{ marginBottom: '0.5em' }}> <strong>GUARDIAN-ID IF PATIENT IS MINOR? :&emsp;</strong> {records.guardian_id?records.guardian_id:"Not Applicable"}</li>
                <Divider /> <br></br>
                <li style={{ marginBottom: '0.5em' }}> <strong>PATIENT IS SPECIALLY ABLED? :&emsp;</strong> {records.disabled}</li>
                <Divider /> <br></br>
                <li style={{ marginBottom: '0.5em' }}> <strong>PATIENT CAPABLE OF USING WEBAPP? :&emsp;</strong> {records.haswebappaccess}</li>
                {/* <li> <strong>PATIENT ID:</strong> {records.phone}</li>
          <li> <strong>PATIENT ID:</strong> {records.phone}</li>  */}
            </ul>

        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>PATIENT MEDICAL DATA</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550}} aria-label="simple table">
        <TableHead sx={{ backgroundColor:"whitesmoke" }}>
          <TableRow>
            <TableCell>Date</TableCell>
              <TableCell align="left">Record ID</TableCell>
              <TableCell align="left">Generated By</TableCell>
              <TableCell align="left">Hospital Name</TableCell>
              <TableCell align="left">Record Type</TableCell>
              <TableCell align="left">Tags</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ backgroundColor:"white" }}>

          { !loading && Medrecords.map((row,id) => (
            <TableRow
              key={id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {
                // moment(row.gen_date).format('DD/MM/YYYY')
                moment(row.gen_date).format("MMMM D, YYYY")
                
                }
              </TableCell>
                <TableCell align="left">{row.rid}</TableCell>
              <TableCell align="left">Dr. {row.dname}</TableCell>
              <TableCell align="left">{row.ename+" "+row.etype}</TableCell>
              <TableCell align="left"><Button onClick = {() => {openModal(row.auto_id)
               
              // setSelected(row.auto_id)
              }}>{row.rec_type}</Button>


</TableCell>
              <TableCell align="left"><button className='button'>{row.tag1}</button><button className='button'>{row.tag2}</button><button className='button'>{row.tag3}</button></TableCell>

            </TableRow>
          ))}
          {!loading &&Medrecords.length==0?<>                 
            <TableRow > <TableCell>No Consented Records  </TableCell></TableRow>
</>:<></>}
        </TableBody>
      </Table>
    </TableContainer>
    
          
          
        </AccordionDetails>
      </Accordion>
  
      {modalOpen&&itemSelected ?(
<Modal
        keepMounted
        // open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        // aria-describedby="keep-mounted-modal-description"
        className={id}
        open ={modalOpen}
        
      >
         {/* const date = ; */}
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            {itemSelected[0].rec_type}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 ,whiteSpace:"pre"}}>
         
          <strong>Date : </strong>{moment(itemSelected[0].gen_date).format("MMMM D, YYYY")} <br/>
          <strong>Generated By :</strong>Dr. {itemSelected[0].dname}<br/>
          <strong>Tags : </strong><button className='button'>{itemSelected[0].tag1}</button><button className='button'>{itemSelected[0].tag2}</button><button className='button'>{itemSelected[0].tag3}</button>


            <br/>{itemSelected[0].desc.split("<br/>")}
           
          </Typography>
         <Button sx={{ mx: 38 }} variant="contained" className='btn btn-primary' startIcon={<CloseIcon/>} onClick={handleClose}>Close</Button>
         
        </Box>

      </Modal>):<></>}
    
      {/* <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Collapsible Group Item #3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}


    </div>
    <Button
    variant="contained"
    color="primary"
    size="small"
    // endIcon={<RedoIcon />}
    // onClick={(event) => {
    //   handleClick(event, cellValues);
sx={{marginTop:'10px'}}

    onClick={() => { nav(`/new-consent-request/${did}/${name}`)
    }
    }
>
    Raise New Consent Request
</Button>
</>

  );
}
