  // import React, { useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
// import ArrowIcon from '@mui/icons-material/ArrowForwardTwoTone';
// import ForwardIcon from '@mui/icons-material/ForwardTwoTone';
// import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import RedoIcon from '@mui/icons-material/RedoTwoTone';
import { useEffect, useState } from "react";
import ViewPatientsService from "../../services/ViewPatientsService";
import { useNavigate} from "react-router-dom";
import * as moment from 'moment';
// (row) => ({id:PatientId})
// const handleClick = (event, cellValues) => {
//   console.log("Hello button");
// };



export default function PatientsList(props) {

  const id=props.did;
  const name=props.name;
  const token=props.token;
  const navigate=useNavigate();

  
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ViewPatientsService.getPatients(id,token);
        // let res=response.data['test'];
        let res=response.data;
            // setCount(res)
          


            // for (let i = 0; i <res.length; i++) {
            //   res[i]['auto_id']=i+1;
            // }
            // console.log(res)
        // setRecords(response.data[0]);
        setRecords(res);
        // console.log(records)
        // console.log(response)
        // console.log(response.data[0])
        // console.log(records)
        // let res=response.data['finalRecordsList'];
        // // setCount(res)
        // console.log(res)


        // for (let i = 0; i <res.length; i++) {
        //   res[i]['auto_id']=i+1;
        // }
        // console.log(res)
        // setRecords(res);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      // console.log(records)
    };
    fetchData(); 
  }, []);

  // const rows=[]
  // rows=JSON.parse(response.data);
  // rows=records.map(rows);
  // (row) => ({id:did});
  const ViewDetails=(did,pid) =>{
    console.log("Hello "+did+ " "+pid);
    navigate("/"+did+"/viewpatients/viewdetails/"+pid+"/"+name);

    // /:did/viewpatients/viewdetatils/:pid
  }
  
  const columns = [
    { field: 'pid', headerName: 'PatientId', width: 200 },
    {
      field: 'patientName',
      headerName: 'Patient name',
      headerClassName: 'super-app-theme--header',
      width: 250,
      editable: true,
    },
    {
      field: 'lastVisited',
      headerName: 'Last Visit Data',
      type: 'string',
      width: 200,
      editable: true,
    },
  {
    field: " ",
    // renderCell: (cellValues) => {
    // const renderDetailsButton: (params) => {
      renderCell: params => {
        const { row } = params;
      return (
        // records.map(row=>(
          
        <Button
          variant="contained"
          color="primary"
          size="small"
          endIcon={<RedoIcon />}
          // onClick={(event) => {
          //   handleClick(event, cellValues);
         
          onClick={() => { ViewDetails(id,row.pid)}
          }
        >
          View
        </Button>)
      // ));
    }
  }
  

  
  ];

  return (
    <div className="container">
       {/* <h1>{records.map(rows,id)}</h1> */}
    <Box sx={{height: 400, width: '100%' }}>
     
      <DataGrid  
        // rows= {records}
        rows={records} 
        getRowId={(row) => row.pid} 
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
              // variant:"outlined", color:"primary"
            },
          },
        }}
        pageSizeOptions={[5]}


        // checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    </div>
  );
}

