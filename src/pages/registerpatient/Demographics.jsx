import * as React from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import {FormControl, Grid, ModalClose, ModalDialog, Select} from "@mui/joy";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import {useState} from "react";
import Button from "@mui/material/Button";
import {toast, ToastContainer} from "react-toastify";
import reg from "../../services/RegisterPatient";
import Modal from "@mui/material/Modal";
import CircularProgress from '@material-ui/core/CircularProgress';

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MenuItem from "@mui/material/MenuItem";
import {InputLabel} from "@mui/material";

function Demographics(props) {
    const theme = createTheme();
    const token=props.token;

    const [dob, setDob] = useState("");

    const [age, setAge] = useState("");
    const [minor_incapacitated, setminor_incapacitated] = useState(false);
    const [disablitity,setdisablitity] = useState(false);
    const [haswebappaccess,setwebaccess] = useState(false);

    const [agreement, setAgreement] = useState(false);

    const [patientid, setpatientid] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [loading, setLoading] = useState(false);

    const genderOptions = [
        {
            value: "Male",
            label: "Male",
        },
        {
            value: "Female",
            label: "Female",
        },
        {
            value: "Other",
            label: "Other",
        },
    ];

    const [records,
        setRecords] = useState({
        'name':"",
        'uniqueid':"",
        'gender':"",
        'email':"",
        'phone':"",
        'address':"",
        'guardian_id':"",


    });
    const handleCheckboxChange = (event) => {
        setminor_incapacitated(event.target.checked);
    };

    const handleCheckboxdisable= (event) => {
        setdisablitity(event.target.checked);
    };
    const handleCheckboxwebaccess= (event) => {
        setwebaccess(event.target.checked);
    };


    const handleDobChange = (event) => {
        setDob(event.target.value);

        // Calculate age
        const birthDate = new Date(event.target.value);
        const today = new Date();
        const diff = today - birthDate;
        const ageInYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        if(ageInYears<0) {
            alert("Invalid DOB please select correct Date of Birth")
            setDob("");
            setAge("");
        }
        else {
            setAge(ageInYears);

            if (ageInYears < 18) {
                setminor_incapacitated(true);
            } else {
                setminor_incapacitated(false);
                records.guardian_id = "";
            }
        }

    };
    const handleCheckbox = (event) => {
        setAgreement(event.target.checked);
    }
    const handleChange = (e) => {
        const value = e.target.value;
        // setAge(ageInYears);
        setRecords({ ...records, [e.target.name]: value });
    };
    const processRegistration= (e) => {


        setLoading(true);
        e.preventDefault();
        let data=
            {
                'name': records.name,
                'uniqueid': records.uniqueid,
                'dob': dob,
                'age': age,
                'gender':records.gender,
                'email':records.email,
                'phone':records.phone,
                'address':records.address,
                'minor_incapacitated':minor_incapacitated,
                'disabled':disablitity,
                'haswebappaccess':haswebappaccess,
                'guardian_id':records.guardian_id
            }
        console.log(data);
        if(!data.name || !data.dob || !data.uniqueid || !data.gender || !data.phone)
        {
            setLoading(false);
            alert("One or more required field empty" );
        }
        else if(data.age<0)
        {
            setLoading(false);
            alert("Invalid DOB please select correct date" );
        }
        else if(data.age<18  && !data.guardian_id)
        {
            setLoading(false);
            alert("Guardian Id is mandatory for Minor/Incapacinated" );
        }
        // console.log(JSON.parse(JSON.stringify(data)))
        // console.log(JSON.stringify(data));

            // do something with data
    else {
            reg.processRegistration(data, token)
                .then((response) => {
                    if (response.status === 200) {
                        setLoading(false);
                        // toast.success("Successfully Generated the record!!", {
                        //     position: "bottom-right",
                        //     autoClose: 2000,
                        //     hideProgressBar: false,
                        //     closeOnClick: true,
                        //     pauseOnHover: true,
                        //     draggable: true,
                        //     progress: undefined,
                        //
                        // })


                        console.log(response);
                        let res = response.data;

                        console.log(res);
                        setpatientid(res);
                        // response.json().then((data) => {
                        //     setpatientid(data);
                        setModalVisible(true);
                        // });
                    }

                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                });
            // setLoading(false);
        }


    };

    const reset = (e) => {
        e.preventDefault();
        setminor_incapacitated(false);
        setdisablitity(false);
        setwebaccess(false);
        setAgreement(false);

        setDob("");
        setAge("");

        setRecords({
            'name':"",
            'uniqueid':"",
            // 'dob':"",
            // 'age':"",
            'gender':"",
            'email':"",
            'phone':"",
            'address':"",
            // 'minor':false,
            'guardian_id':"",
            // 'disabled':false,
            // 'iscapable':false,
        });

    };
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="lg">
                    <CssBaseline />
            {/*<Typography variant="h6" gutterBottom>*/}
            {/*    Patient Registration*/}
            {/*</Typography>*/}
            <Grid container spacing={4} >
                <Grid item xs={12} sm={5}>
                    <TextField
                        required
                        id="Name"
                        name="name"
                        label="Name"
                        value={records.name}
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        onChange={(e) => handleChange(e)}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        required
                        id="uniqueId"
                        name="uniqueid"
                        label="Unique ID"
                        value={records.uniqueid}
                        fullWidth
                        autoComplete="id"
                        variant="standard"
                        onChange={(e) => handleChange(e)}
                    />
                </Grid>
                <Grid item xs={12} sm={2.5}>

                <TextField
                    id="dob"
                    required
                    // disabled={true}
                    label="DOB"
                    type="date"
                    // defaultValue=
                    name="dob"
                    value={dob}
                    // onChange={(e) => handleChange(e)}
                    onChange={handleDobChange}
                    sx={{ width: "100%"}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    // onChange={(e) => handleChange(e)}
                />
                </Grid>

                <Grid item xs={12} sm={2.5}>

                    <TextField
                        id="age"
                        // disabled={true}
                        disabled
                        label="Age"
                        // type="date"
                        // defaultValue=
                        name="age"
                        value={age}
                        // value={records.gen_date}
                        // onChange={(e) => handleChange(e)}
                        sx={{ width: "100%"}}
                        InputLabelProps={{
                            readOnly: true,

                        }}
                        // onChange={(e) => handleChange(e)}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        select
                        required
                        id="gender"
                        name="gender"
                        label="Gender"
                        fullWidth
                        value={records.gender}
                        autoComplete="gender"
                        variant="standard"
                        onChange={(e) => handleChange(e)}
                        >
                        {genderOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/*<Select*/}
                    {/*    labelId="demo-simple-select-helper-label"*/}
                    {/*    id="demo-simple-select-helper"*/}
                    {/*    value={gender}*/}
                    {/*    label="Gender"*/}
                    {/*    // onChange={handleChange}*/}
                    {/*    onChange={(e) => handleChange(e)}*/}
                    {/*>*/}
                    {/*    <MenuItem value="">*/}
                    {/*        <em>None</em>*/}
                    {/*    </MenuItem>*/}
                    {/*    <MenuItem value={10}>Female</MenuItem>*/}
                    {/*    <MenuItem value={20}>Male</MenuItem>*/}
                    {/*    <MenuItem value={30}>Others</MenuItem>*/}
                    {/*</Select>*/}

                    {/*<FormControl variant="standard" fullWidth required>*/}
                    {/*    <InputLabel id="gender-label">Gender</InputLabel>*/}
                    {/*    <Select*/}
                    {/*        labelId="gender-label"*/}
                    {/*        id="gender"*/}
                    {/*        name="gender"*/}
                    {/*        value={records.gender}*/}
                    {/*        onChange={(e) => handleChange(e)}*/}
                    {/*    >*/}
                    {/*        <MenuItem value="male">Male</MenuItem>*/}
                    {/*        <MenuItem value="female">Female</MenuItem>*/}
                    {/*        <MenuItem value="other">Other</MenuItem>*/}
                    {/*    </Select>*/}
                    {/*</FormControl>*/}
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        required
                        id="phone"
                        name="phone"
                        label="Contact No."
                        value={records.phone}
                        fullWidth
                        autoComplete="phone"
                        variant="standard"
                        onChange={(e) => handleChange(e)}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField

                        id="email"
                        name="email"
                        type="email"
                        label="Email Id"
                        value={records.email}
                        fullWidth
                        autoComplete="email"
                        variant="standard"
                        onChange={(e) => handleChange(e)}
                    />
                </Grid>
                <Grid item xs={12} sm={10}>
                    <TextField
                        id="address"
                        name="address"
                        label="Address"
                        value={records.address}
                        fullWidth
                        variant="standard"
                        onChange={(e) => handleChange(e)}
                    />
                </Grid>
                <Grid item xs={12} sm={3} >
                    <FormControlLabel

                        control={<Checkbox color="secondary" id="checkboxminor"name="minor" value="true"
                                           checked={minor_incapacitated}
                                           // checked={Incapable}
                                           onChange={handleCheckboxChange}/>}
                        // value={records.minor}
                        label="Patient is Minor/ Needs Guardian access?"
                        onChange={(e) => handleChange(e)}
                    />

                </Grid>
                {minor_incapacitated && (
                    <Grid item xs={12} sm={5}>
                        <TextField
                            id="guardian_id"
                            name="guardian_id"
                            label="Guardian's ID if patient is Minor/ needs Guardian access"
                            fullWidth
                            value={records.guardian_id}
                            // onChange={handleGuardianIdChange}

                            variant="standard"
                            onChange={(e) => handleChange(e)}
                        />
                    </Grid>
                )}
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="disabled"
                                           checked={disablitity}
                                           value={records.disabled}
                                           onChange={handleCheckboxdisable}

                        />}
                        label="Patient having any Disability?"
                        // value={records.disabled}
                        onChange={(e) => handleChange(e)}

                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="iscapable"
                                           checked={haswebappaccess} value="true"
                                           onChange={handleCheckboxwebaccess}
                        />}
                        label="Patient/Guardian can access webapp?"
                        value={records.iscapable}
                        onChange={(e) => handleChange(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox color="secondary" required id="checkboxagree"
                                       checked={agreement} onChange={handleCheckbox} />}
                                  label="I have verified the above patient details, proceed to registration." />


                </Grid>
                <Grid item xs={2}>

                    {loading ? (
                        <CircularProgress color="success" />
                    ) : (
                        <Button type="submit" variant="contained" disabled={!agreement}  color="success" onClick={processRegistration}>
                            SUBMIT
                        </Button>
                    )}
                    {/*{loading && (*/}
                    {/*    <div*/}
                    {/*        style={{*/}
                    {/*            position: "absolute",*/}
                    {/*            top: 0,*/}
                    {/*            left: 0,*/}
                    {/*            width: "100%",*/}
                    {/*            height: "100%",*/}
                    {/*            display: "flex",*/}
                    {/*            justifyContent: "center",*/}
                    {/*            alignItems: "center",*/}
                    {/*            backgroundColor: "rgba(0, 0, 0, 0.5)",*/}
                    {/*            zIndex: 9999,*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        <CircularProgress />*/}
                    {/*    </div>*/}
                    {/*)}*/}



                </Grid>
                <Grid item xs={5}>
                <Button variant="outlined"  sx={{marginLeft:2}}   onClick={reset}>
                    Clear
                </Button>
                </Grid>
            </Grid>
                </Container>
            </ThemeProvider>

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

            <Modal open={modalVisible} onClose={() => setModalVisible(false)}>
                {/*<div>{JSON.stringify(patientid)}</div>*/}

                <ModalDialog

                    color="primary"
                    size="lg"
                    variant="soft"
                >
                    {/*<ModalClose />*/}
                    <Typography  component="h2" level="inherit">
                        <strong>Patient Registration Completed !!</strong>
                    </Typography>
                    <br />

                    <Typography id="variant-modal-description" textColor="inherit">
                        <i>Patient ID :</i> <strong>{patientid.pid}</strong>
                    </Typography>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}

export default Demographics;