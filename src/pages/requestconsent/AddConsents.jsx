import React, { useState } from "react";
import medical_record  from "../../services/MedicalRecordsService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import moment from 'moment/moment';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import requestConsentService from "../../services/RequestConsentService";
import requestEmergencyConsentService from "../../services/RequestEmergencyConsentService";
import Toggle from "../../components/toggle/Toggle";
const AddConsents = (props) => {
    const theme = createTheme();
    const [agreement, setAgreement] = useState(false);
    const [startDate, setStartDate]=useState(null);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(false);
    const token=props.token;
    const [checked, setChecked] = useState(false);
    var today = moment();
    // var tomorrow = moment(today).add(1, 'days');
    const [consents, setConsents] = useState({

    });
    const handleChange = (e) => {
        const value = e.target.value;
        setConsents({ ...consents, [e.target.name]: value });
    };
    const saveConsents=async(e) => {
        let date1=new Date(consents['from_date'])
        let date2=new Date(consents['to_date'])
        let date3=new Date(consents['expiry_date'])
        e.preventDefault();
        const x = Math.floor((Math.random() * 100) + 1);
        if(consents['pid']===""||consents['tag1']===""||consents['tag2']===""||consents['tag3']===""||consents['from_date']===""||consents['to_date']===""||consents['expiry_date']==="") {
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
            if(((date1>=date2)||(date1>=today)) && (date3<=today)) {
                toast.warn("Please enter all dates properly!!", {
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

        if((date1>=date2)||(date1>=today)) {
            toast.warn("Please enter from date date and to date properly!!", {
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
        if(date3<=today) {
            toast.warn("Please enter expiry date dates properly!!", {
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
        console.log(consents);
        if(value)
        {
            const result= {
                'pendingRequestId':'CR0'+x,
                'pid': consents.pid,
                'requestor_id': props.did,
                'requestor_name':props.name,
                'requestor_eid':process.env.REACT_APP_HOSPITAL_ID,
                'requestor_ename':process.env.REACT_APP_HOSPITAL_NAME,
                'reason':'Emergency',
                'tag1': consents.tag1,
                'tag2': consents.tag2,
                'tag3': consents.tag3,
                'from_date':consents.from_date,
                'to_date': consents.to_date,
                'request_date':today,
                'expiry_date':consents.expiry_date,
                'superid':'',
            }
            console.log(result);
            await requestEmergencyConsentService.saveEmergencyConsentRequest(result,token)
                .then((response) => {
                    if (response.status === 200) {
                        toast.success("Successfully Generated the emergency Consent!!", {
                            position: "bottom-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                        reset(e)
                        setValue(false)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else
        {
            const result= {
                'pendingRequestId':'CR0'+x,
                'pid': consents.pid,
                'requestor_id': props.did,
                'requestor_name':props.name,
                'requestor_eid':process.env.REACT_APP_HOSPITAL_ID,
                'requestor_ename':process.env.REACT_APP_HOSPITAL_NAME,
                'reason':consents.reason,
                'tag1': consents.tag1,
                'tag2': consents.tag2,
                'tag3': consents.tag3,
                'from_date':consents.from_date,
                'to_date': consents.to_date,
                'request_date':today,
                'expiry_date':consents.expiry_date,
                'super_id':'',
            }
            console.log(result);
            requestConsentService.saveConsentRequest(result,token)
                .then((response) => {
                    if (response.status === 200) {
                        toast.success("Successfully Generated the Consent!!", {
                            position: "bottom-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                        reset(e)

                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    };
    const handleCheckbox = (event) => {
        setChecked(!checked)
        setAgreement(event.target.checked);
    }
    const reset = (e) => {
        setChecked(false)
        e.preventDefault();
        setAgreement(false);
        setConsents({
            'pid':'',
            'tag1':'',
            'tag2':'',
            'tag3':'',
            'from_date':'',
            'to_date':'',
            'expiry_date':'',
            'reason':'',
            'togglevalue':false,
        });
        setValue(false)

    };
    return (
        <div className="widgetLg">
            {/*{loading?<>{loading?<>*/}
            {/*    <img src={img}></img>*/}
            {/*</>:<></>}</>:<></>}*/}

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
                                            value={consents.pid}
                                            onChange={(e) => handleChange(e)}
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={8}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="reason"
                                            value={consents.reason}
                                            onChange={(e) => handleChange(e)}
                                            required
                                            fullWidth
                                            id="reason"
                                            label="reason"

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={4}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="tag1"
                                            label="Tag-1"
                                            name="tag1"
                                            value={consents.tag1}
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
                                            value={consents.tag2}
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
                                            value={consents.tag3}
                                            onChange={(e) => handleChange(e)}
                                            autoComplete="tag3-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={4}>
                                        <TextField
                                            id="date"
                                            label="From Date"
                                            type="date"
                                            defaultValue="yyyy-mm-dd"
                                            name="from_date"
                                            value={consents.from_date}
                                            onChange={(e) => handleChange(e)}
                                            sx={{width: 330}}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={4}>
                                        <TextField
                                            id="date"
                                            label="To Date"
                                            type="date"
                                            defaultValue="yyyy-mm-dd"
                                            name="to_date"
                                            value={consents.to_date}
                                            onChange={(e) => handleChange(e)}
                                            sx={{width: 330}}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={4}>
                                        <TextField
                                            id="date"
                                            label="Expiry Date"
                                            type="date"
                                            defaultValue="yyyy-mm-dd"
                                            name="expiry_date"
                                            value={consents.expiry_date}
                                            onChange={(e) => handleChange(e)}
                                            sx={{width: 330}}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <br/>
                                    <Grid item xs={12} sm={6} lg={4}>
                                        <div style={{fontSize: 16}}>


                                            <React.Fragment>
                                                <div className="container" >

                                                <div style={{marginTop:"20px"}}>Is this an Emergency Consent ?</div>
                                                    <div>
                                                        <Toggle
                                                            label="Emergency Consent"
                                                            isOn={value}
                                                            handleToggle={() => setValue(!value)}/>
                                                    </div>
                                                {/*{consents.togglevalue=value}*/}
                                                {/*{console.log(value)}*/}
                                                <br/>
                                                </div>
                                            </React.Fragment>
                                        </div>
                                    </Grid>

                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
                <br/>
                <div className="right">
                    <FormControlLabel control={<Checkbox required id="checkbox" className="checkbox" checked={checked} onChange={handleCheckbox} />} label="I hereby declare that I have requested only required documents to diagnose the patient and will ensure to maintain patient doctor confidentiality." />
                    <br/>
                    <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
                        <br/>
                        <Button variant="contained" disabled={!agreement}  color="success" onClick={saveConsents}>
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

export default AddConsents;