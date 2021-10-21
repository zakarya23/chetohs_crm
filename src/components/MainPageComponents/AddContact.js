////////////////////////////////////////////////////////////
// Author(s): Zakarya Butt, Rebecca Ye, Nicholas Ang
// Date Made: 26/09/2021
////////////////////////////////////////////////////////////

import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import './AddContact.css'; 
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '@material-ui/icons/ArrowBack'; 
import { IconButton, AppBar, Toolbar } from '@material-ui/core';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import AlertMessage from '../AlertMessage/AlertMessage';

const config = require('../Configuration/config.json');
const API_URL =  config.API_URL; 

export default function EditInfo() {

    const homepage = async (e) => {
        e.preventDefault();
        window.location.href = '/';
    }
    
    // Client information
    const [firstName, setFirst] = useState(); 
    const [familyName, setFamily] = useState(); 
    const [dob, setDob] = useState(); 
    const [gender, setGender] = useState(); 
    const [number, setNumber] = useState(); 
    const [email, setEmail] = useState(); 

    // Company informtion
    const [companyName, setCompanyName]= useState(); 
    const [location, setLocation] = useState(); 
    const [position, setPosition] = useState(); 
    const [department, setDepartment]= useState(); 
    const [priority, setPriority] = useState(); 
    const [status, setStatus] = useState(); 

    const [addClientStatus, setAddClientStatus] = useState();

    const makeCustomer = () => {
        // Phone number 10
        // Sends a request to the backend to make a new customer
        var clientFields =  firstName || familyName || dob || gender || number || email || priority || status || companyName || location | position | department; 

        var req = {
            client : {"firstName":firstName, "familyName": familyName, "dob": dob, "gender":gender, "number":number, "email":email}, 
            company : {"name":companyName, "location":location, "position":position, "department":department, "priority": priority, "status": status}
        }

        if (!clientFields) {
            setAddClientStatus({ msg: "Please fill in all fields!", key: Math.random(), severity: 'warning' });
        }
        else {
            axios.post(API_URL + 'user/addCustomer', req).then(res => {
                setAddClientStatus({ msg: "Client successfully added.", key: Math.random(), severity: "success" });
            })
        }
    }
  

    return (
        <>
            <section className="topBar">
                <AppBar position="Fixed" color="white" boxShadow={4}>
                    <Toolbar>
                        <Box 
                            flexGrow={0.95}>
                            <IconButton edge="start" marginLeft="auto">
                                <BackButton
                                    onClick={homepage}>
                                </BackButton>    
                            </IconButton>
                        </Box>
                        <Box flexGrow={1}>
                            <img class="header" src="/logo.png" alt="logo" width="207" height="55" />
                        </Box>
                    </Toolbar>
                </AppBar>
            </section>
            <h1 className="clientHeading">Add Contact</h1>
            
            <section className="boxes">
                    <br/>
                    <section className="client-info">
                    <h4>Client Information</h4>
                        <TextField
                            required
                            id="firstname"
                            label="First Name"
                            placeholder="e.g. John"
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => setFirst(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="familyName"
                            label="Family Name"
                            placeholder="e.g. Doe"
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => setFamily(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="dob"
                            label="Date of Birth"
                            placeholder="At least 8 symbols..."
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => setDob(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="gender"
                            label="Gender"
                            placeholder="Type here..."
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => setGender(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="number"
                            label="Phone Number"
                            placeholder="+7 (· · · ) · · · · · · ·"
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => setNumber(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="email"
                            label="Email"
                            placeholder="e.g. john@gmail.com"
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </section> 

                    <br/>
                    <section className="company-info">
                    <h4>Company Information</h4>
                        <TextField
                            required
                            id="companyName"
                            label="Company Name"
                            placeholder="e.g. Google"
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => setCompanyName(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="companyLocation"
                            label="Company Location"
                            // type="password"
                            placeholder="e.g. Melbourne, Australia"
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => setLocation(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="position"
                            label="Position at Company"
                            placeholder="e.g. CEO"
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => setPosition(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="department"
                            label="Department at Company"
                            placeholder="e.g. Technology"
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => setDepartment(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <Box sx={{ width: 200 }}>
                            <FormControl fullWidth>
                                <InputLabel id="priority">Priority</InputLabel>
                                <Select
                                labelId="priority"
                                id="priority"
                                label="Priority"
                                onChange={e => setPriority(e.target.value)}
                                >
                                <MenuItem value={"Low"}>Low</MenuItem>
                                <MenuItem value={"Medium"}>Medium</MenuItem>
                                <MenuItem value={"High"}>High</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <br/>
                        <br/>
                        <Box sx={{ width: 200 }}>
                            <FormControl fullWidth>
                                <InputLabel id="progress">Progress</InputLabel>
                                <Select
                                labelId="progress"
                                id="progress"
                                label="Progress"
                                onChange={e => setStatus(e.target.value)}
                                >
                                <MenuItem value={"New"}>New</MenuItem>
                                <MenuItem value={"Invited"}>Invited</MenuItem>
                                <MenuItem value={"Met"}>Met</MenuItem>
                                <MenuItem value={"Negotiation"}>Negotiation</MenuItem>
                                <MenuItem value={"Conclude"}>Conclude</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <br/>
                        <br/>
                    </section> 

                
            </section>
            <section className="add-contact">
                <Button
                    onClick={makeCustomer}
                    className 
                    type="submit"
                    variant="contained"
                    color="secondary"
                    style={{minWidth: "85px", maxWidth: "150px", minHeight:"35px"}}>
                    Add Contact
                </Button>
                {addClientStatus ? <AlertMessage key={addClientStatus.key} message={addClientStatus.msg} severity={addClientStatus.severity} /> : null}
            </section>
        </>
    )
}