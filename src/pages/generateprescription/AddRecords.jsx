import React, { useState } from "react";
import medical_record  from "../../services/MedicalRecordsService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import moment from 'moment/moment';
import add_one_day_consent from "../../services/OnedayConsent";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
const AddRecords = (props) => {
  const theme = createTheme();
  const [agreement, setAgreement] = useState(false);
  const token=props.token;
  const [checked, setChecked] = useState(false);
  var today = moment();
  var tomorrow = moment(today).add(1, 'days');
    const [records, setRecords] = useState({
    'pid': "",
    'did': props.did,
    'tag1': "",
    'tag2':"",
    'tag3':"",
    'type': "Prescription",
    'gen_date':today,
    'vitals':"",
    'obser':"",
    'presc':"",
    'diagnosis':""
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setRecords({ ...records, [e.target.name]: value });
  };
  const saveRecords= (e) => {
    e.preventDefault();
    const x = Math.floor((Math.random() * 100) + 1);
    if(records['pid']===""||records['tag1']===""||records['tag2']===""||records['tag3']===""||records['obser']===""||records['presc']===""||records['vitals']===""){
      toast.warn("Please enter all the fields!!", {
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




    const result= {
      'rid':'MR0'+x,
      'pid': records.pid,
      'gen_did': props.did,
      'tag1': records.tag1,
      'tag2': records.tag2,
      'tag3': records.tag3,
      'type': "Prescription",
      'gen_date':today,
      'description':"Vitals : \n"+records.vitals+"<br/>\nObservation : \n"+records.obser+"<br/>\nDiagnosis : \n"+records.diagnosis+"\n<br/>Treatment Plan: \n"+records.presc+"<br/>"}
    console.log(result);
    medical_record.saveMedicalRecords(result,token)
        .then((response) => {
          if (response.status === 200) {
            const x = Math.floor((Math.random() * 100) + 1);
            let consent_record=[]
            consent_record[0]={
              'cid':'CID'+x,
              'pid':records.pid,
              'accessor_id':result.gen_did,
              'accessing_eid':process.env.REACT_APP_HOSPITAL_ID,
              'last_update':today,
              'status':'Active',
              'create_date':today,
              'expiry_date':tomorrow,
              'action_taken_by':result.gen_did,
              'reason':'One day Consent on generation of record',
              'rid':result.rid,
              'record_creator_id':result.gen_did,
              'provider_eid':process.env.REACT_APP_HOSPITAL_ID,
              'tag1':records.tag1,
              'tag2':records.tag2,
              'tag3':records.tag3,
              'active_flag':'1',
              'accessor_name':"Dr."+props.name,
              'accessing_ename':process.env.REACT_APP_HOSPITAL_NAME,
              'consent_tag1':records.tag1,
              'consent_tag2':records.tag2,
              'consent_tag3':records.tag3,
            }
            add_one_day_consent.saveOneDayConsent(token,consent_record)
                .then((response) => {
                      if (response.status === 200) {
                        toast.success("Successfully Generated the record & One day consent on that record!!", {
                          position: "bottom-right",
                          autoClose: 1000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        })
                      }
                    }
                )
            reset(e)
          }
        })
        .catch((error) => {
          console.log(error);
        });
  };
  const handleCheckbox = (event) => {
    setChecked(!checked)
    setAgreement(event.target.checked);
  }
  const reset = (e) => {
    setChecked(false)
    e.preventDefault();
    setAgreement(false);
    setRecords({
      'pid': "",
      'did': props.did,
      'tag1': "",
      'tag2':"",
      'tag3':"",
      'type': "Prescription",
      'gen_date':"",
      'vitals':"",
      'obser':"",
      'presc':"",
      'diagnosis':""
    });
  };
  return (
      <div className="widgetLg">
        <div className="flex max-w-2xl mx-auto shadow border-b">
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
              <CssBaseline />
              <Box
                  sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    // alignItems: 'center',
                  }}
              >
                <Box component="form" noValidate sx={{ mt: 3 }}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} lg={4}>
                      <TextField

                          name="pid"
                          required
                          fullWidth
                          id="pid"
                          label="Patient ID"
                          value={records.pid}
                          onChange={(e) => handleChange(e)}
                          autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={8}>
                      <TextField
                          autoComplete="given-name"
                          name="vitals"
                          value={records.vitals}
                          onChange={(e) => handleChange(e)}
                          required
                          fullWidth
                          id="Vitals"
                          label="Vitals"

                      />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                      <TextField
                          required
                          fullWidth
                          id="tag1"
                          label="Tag-1"
                          name="tag1"
                          value={records.tag1}
                          onChange={(e) => handleChange(e)}
                          autoComplete="tag1-name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                      <TextField
                          required
                          fullWidth
                          id="tag2"
                          label="Tag-2"
                          name="tag2"
                          value={records.tag2}
                          onChange={(e) => handleChange(e)}
                          autoComplete="tag2-name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                      <TextField
                          required
                          fullWidth
                          id="tag3"
                          label="Tag-3"
                          name="tag3"
                          value={records.tag3}
                          onChange={(e) => handleChange(e)}
                          autoComplete="tag3-name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                          required
                          fullWidth
                          id="obser"
                          label="Observation"
                          name="obser"
                          value={records.obser}
                          onChange={(e) => handleChange(e)}
                          autoComplete="obser"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                          required
                          fullWidth
                          name="diagnosis"
                          value={records.diagnosis}
                          onChange={(e) => handleChange(e)}
                          label="Diagnosis"
                          id="diagnosis"
                          autoComplete="new-diagnosis"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                          required
                          fullWidth

                          label="Treatment Plan"
                          id="presc"
                          name="presc"
                          value={records.presc}
                          onChange={(e) => handleChange(e)}
                          autoComplete="new-presc"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
          <div className="right">
            <FormControlLabel control={<Checkbox required id="checkbox" className="checkbox" checked={checked} onChange={handleCheckbox} />} label="I hereby declare that this prescription is generated by me and can be used to dispense the medicine that I am prescribing for the allotted duration and dosage." />
            <br/>
            <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
              <br/>
              <Button variant="contained" disabled={!agreement}  color="success" onClick={saveRecords}>
                Generate
              </Button>
              <Button variant="outlined"  sx={{marginLeft:2}}   onClick={reset}>
                Clear
              </Button>
            </div>
          </div>
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
          {/* </div> */}
        </div>
      </div>
  );
};

export default AddRecords;