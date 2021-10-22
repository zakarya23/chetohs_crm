//////////////////////////////
// Author(s): Zakarya Butt, Rebecca Ye, Tiana Litchfield, Terry Tran, Nicholas Ang
// Date Made: 12/09/2021
//////////////////////////////

import './Profile.css'; 
import TextField from '@material-ui/core/TextField';
import BackButton from '@material-ui/icons/ArrowBack'; 
import Pen from '@material-ui/icons/Create'; 
import { IconButton, AppBar, Toolbar, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import { useEffect, useState, Fragment } from 'react';

import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers';

import Button from '@material-ui/core/Button';

import Avatar from "./pngegg.png";

async function changeContact(link, id, phoneNumber, email) {
    var req = {"phoneNumber": phoneNumber,
                "email": email };
    try {
        axios.post(link + 'user/changeContact/' + id, req);
    }
    catch (err) {
        if ((err)) return alert('check your connection');
        throw err;
    }
}

async function changeCompanyInfo(link, id, name, location, position, department) {
    var req = {"name": name,
               "location": location,
               "position": position,
               "department": department };
    try {
        axios.post(link + 'user/changeCompInfo/' + id, req);
    }
    catch (err) {
        if ((err)) return alert('check your connection');
        throw err;
    }
}

async function changeTaskInfo(link, id, desc, timeline) {
    var req = {"description": desc,
               "timeline": timeline };
    try {
        axios.post(link + 'user/changeTaskInfo/' + id, req);
    }
    catch (err) {
        if ((err)) return alert('check your connection');
        throw err;
    }
}

async function changeNotes(link, id, notes) {
    var req = {"notes": notes }
    try {
        axios.post(link + 'user/changeNotes/' + id, req);
    }
    catch (err) {
        if ((err)) return alert('check your connection');
        throw err;
    }
}

async function changePersonalDetails(link, id, firstName, familyName, dob) {
    var req = {"firstName": firstName,
               "familyName": familyName,
               "dob": dob };
    try {
        axios.post(link + 'user/changePersonalDetails/' + id, req);
    }
    catch (err) {
        if ((err)) return alert('check your connection');
        throw err;
    }
}

export default function Profile({props}) {
    const config = require('../Configuration/config.json');
    const link =  config.API_URL; 
    var [customer, setCustomer] = useState(); 
    var [company, setCompany] = useState(); 
    
    var [notes, setNotes] = useState();
    var [number, setNumber] = useState();
    var [email, setEmail] = useState();

    var [name, setName] = useState();
    var [location, setLocation] = useState();
    var [position, setPosition] = useState();
    var [department, setDepartment] = useState();
    var [description, setDescription] = useState();
    var [timeline, setTimeline] = useState();

    var [pnotes, setpNotes] = useState();
    var [pnumber, setpNumber] = useState();
    var [pemail, setpEmail] = useState();
    var [dob, setDob] = useState(new Date());
    
    var [firstName, setFirstName] = useState();
    var [familyName, setFamilyName] = useState();
    var [pfirstName, setpFirstName] = useState();
    var [pfamilyName, setpFamilyName] = useState();
    var [gender, setGender] = useState();

    var [pname, setpName] = useState();
    var [plocation, setpLocation] = useState();
    var [pposition, setpPosition] = useState();
    var [pdepartment, setpDepartment] = useState();
    var [pdescription, setpDescription] = useState();
    var [ptimeline, setpTimeline] = useState();
    let {id} = useParams();

    var [progress, setProgress] = useState();
    var [priority, setPriority] = useState();

    var [lastContact, setLastContact] = useState(new Date());
    var [nextMeeting, setNextMeeting] = useState(new Date());

    const homepage = async (e) => {
        e.preventDefault();
        window.location.href = '/';
    }

    // Called as soon as the page is loaded.
    useEffect(() => {
        // Gets data for the specific customer from the db. 
        async function getCustomer(){
            try {
                axios.post(link + 'user/profile/' + id)
                .then(res => {
                    var data = res.data; 
                    var cust = data.customer; 
                    var comp = data.company; 
                    setCustomer(cust); 
                    setCompany(comp);
                    setProgress(cust.progress);
                    setPriority(cust.priority);
                    setLastContact(cust.lastContact);
                    setNextMeeting(cust.meeting);
                    setNotes(cust.notes);
                    setpNotes(cust.notes);
                    setDescription(cust.description);
                    setpDescription(cust.description);
                    setNumber(cust.phoneNumber);
                    setpNumber(cust.phoneNumber);
                    setEmail(cust.email);
                    setpEmail(cust.email);
                    setTimeline(cust.timeline);
                    setpTimeline(cust.timeline);
                    setName(comp.name);
                    setpName(comp.name);
                    setLocation(comp.location);
                    setpLocation(comp.location);
                    setPosition(comp.position);
                    setpPosition(comp.position);
                    setDepartment(comp.department);
                    setpDepartment(comp.department);
                    setDob(cust.dob);
                    setFirstName(cust.firstName);
                    setpFirstName(cust.firstName);
                    setFamilyName(cust.familyName);
                    setpFamilyName(cust.familyName);
                    setGender(cust.gender);
                })
            }
            catch (err) {
                if ((err)) return alert('check your connection');
                throw err;
            }

        }

        getCustomer();  
    }, [])

    const submitContact = async (e) => {
        e.preventDefault();
        const res = await changeContact(
            link,
            id,
            number,
            email
        )
        setpNumber(number);
        setpEmail(email);
    }

    const submitCompInfo = async (e) => {
        e.preventDefault();
        const res = await changeCompanyInfo(
            link,
            id,
            name,
            location,
            position,
            department  
        )
        setpName(name);
        setpLocation(location);
        setpPosition(position);
        setpDepartment(department);
    }

    const submitTaskInfo = async (e) => {
        e.preventDefault();
        const res = await changeTaskInfo(
            link,
            id,
            description,
            timeline
        )
        setpDescription(description);
        setpTimeline(timeline);
    }

    const submitNotes = async (e) => {
        e.preventDefault();
        const res = await changeNotes(
            link,
            id,
            notes
        )
        setpNotes(notes);
    }

    const submitPersonalDetails = async (e) => {
        e.preventDefault();
        const res = await changePersonalDetails(
            link,
            id,
            firstName,
            familyName
        )
        setpFirstName(firstName);
        setpFamilyName(familyName);
    }


    async function changeProgress(prog) {
        var req = {"progress": prog}
        try {
            axios.post(link + 'user/progress/' + id, req);
            setProgress(prog)
        }
        catch (err) {
            if ((err)) return alert('check your connection');
            throw err;
        }
    }

    async function changePriority(prio) {
        var req = {"priority": prio}
        try {
            axios.post(link + 'user/priority/' + id, req);
            setPriority(prio);
        }
        catch (err) {
            if ((err)) return alert('check your connection');
            throw err;
        }
    } 

    async function changeLastContact(lcDate) {
        var req = {"lastContact": lcDate}
        try {
            axios.post(link + 'user/lastContact/' + id, req)
            setLastContact(lcDate);
        }
        catch (err) {
            if ((err)) return alert('check your connection');
            throw err;
        }
    }

    async function changeNextMeeting(nmDate) {
        var req = {"meeting": nmDate}
        try {
            axios.post(link + 'user/meeting/' + id, req)
            setNextMeeting(nmDate);
        }
        catch (err) {
            if ((err)) return alert('check your connection');
            throw err;
        }
    }

    async function changeDOB(newDob) {
        var req = {"dob": newDob}
        try {
            axios.post(link + 'user/dob/' + id, req)
            setDob(newDob);
        }
        catch (err) {
            if ((err)) return alert('check your connection');
            throw err;
        }
    }

    return(
        <>
        <AppBar position="fixed" color="white" boxShadow={4}>
            <Toolbar>
                <Box 
                    flexGrow={0.98}>
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
        
        
        
        <div className = "container">
            <div className="rectangle"></div>
            <div className="leftContainer" >
                
                <img class = "avatar" src={Avatar}/>

                
                <Grid container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="center"
                    padding = "1vw"
                >
                    <Grid item spacing={4}>
                    
                    <InputLabel>Progress</InputLabel>
                    <br/>
                    <Select
                        native
                        value={progress}
                        onChange={event => changeProgress(event.target.value)}
                        style={{width:130}}
                        input={
                        <OutlinedInput
                            name="progress"
                            labelWidth={0}
                            id="outlined-age-native-simple"
                        />
                        }
                    >
                        <option value="New">New</option>
                        <option value="Invited">Invited</option>
                        <option value="Met">Met</option>
                        <option value="Negotiation">Negotiation</option>
                        <option value="Conclude">Conclude</option>
                    </Select>
                    <br/>
                    <br/>
                </Grid>

                <Grid item spacing={4} >
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel>Priority</InputLabel>
                    <br/>
                    <Select
                        native
                        value={priority}
                        onChange={event => changePriority(event.target.value)}
                        style={{width:130}}
                        input={
                            <OutlinedInput
                                name="age"
                                labelWidth= "haha"
                                id="outlined-age-native-simple"
                            />
                        }
                        >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Select>
                    </FormControl>
                    <br/>
                    <br/>
                </Grid>

                    <Grid item spacing={4}>
                        <Box 
                            boxShadow={4}
                            borderRadius={5}
                            style={{ padding: "15px", margin: "8px" }}>
                            <>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDateTimePicker
                                ampm={false}
                                label="Last Contact"
                                inputVariant="outlined"
                                value={lastContact}
                                onChange={changeLastContact}
                                format="dd/MM/yyyy hh:mm"
                                />
                            </MuiPickersUtilsProvider>
                            </>   
                        </Box>
                    </Grid>

                    <Grid item spacing={4}>
                        <Box 
                            boxShadow={4}
                            borderRadius={5}
                            style={{ padding: "15px", margin: "8px" }}>
                            <>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDateTimePicker
                                ampm={false}
                                label="Next Meeting"
                                inputVariant="outlined"
                                value={nextMeeting}
                                onChange={changeNextMeeting}
                                format="dd/MM/yyyy hh:mm"
                                />
                            </MuiPickersUtilsProvider>
                            </>   
                        </Box>
                    </Grid>
                </Grid>
            </div>

            <div className="rightContainer">
                <div style = {{padding: "15px", margin: "8px"}}>
                    <div className="top-wrapper">
                        <div className="infoContainer">
                            <>
                            <Box display="flex" justifyContent="space-between">
                                <h1>{pfirstName} {pfamilyName}</h1>
                                <Popup trigger={<IconButton><Pen /></IconButton>} position="bottom center">
                                <div>
                                    <form onSubmit={submitPersonalDetails}>
                                        <p>Edit First Name</p>
                                        <TextField
                                            id="newnotes"
                                            label="First Name"
                                            variant="outlined"
                                            color="secondary"
                                            fullWidth 
                                            onChange={e => setFirstName(e.target.value)}
                                        />
                                        <p>Edit Family Name</p>
                                        <TextField
                                            id="newnotes"
                                            label="Family Name"
                                            variant="outlined"
                                            color="secondary"
                                            fullWidth 
                                            onChange={e => setFamilyName(e.target.value)}
                                        />
                                        <br/>
                                        <br/>
                                        <section className="saveChanges">
                                            <Button
                                                type="save"
                                                variant="contained"
                                                color="secondary"
                                                style={{minWidth: "85px", minHeight:"35px"}}>
                                                Save changes
                                            </Button>
                                        </section>
                                    </form>
                                </div>
                            </Popup>
                            </Box>
                            <p><b>Gender: </b> {gender}</p>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                label="Date of Birth"
                                inputVariant="outlined"
                                value={dob}
                                onChange={changeDOB}
                                format="dd/MM/yyyy"
                                />
                            </MuiPickersUtilsProvider>
                            </>
                        </div>
                            <Box 
                                boxShadow={4}
                                borderRadius={5}
                                style={{ padding: "15px", "margin-left": "6em", width:"25em", marginTop:"2em", marginLeft:"8.5em"}}>
                                <Box display="flex" justifyContent="space-between">
                                    <h3>Contact</h3>
                                    <Popup trigger={<IconButton><Pen /></IconButton>} position="bottom center">
                                        <div>
                                            <form onSubmit={submitContact}>
                                                <p>Edit Mobile</p>
                                                <TextField
                                                    id="newnotes"
                                                    label="Edit Mobile"
                                                    placeholder="Write new number here"
                                                    multiline
                                                    variant="outlined"
                                                    color="secondary"
                                                    fullWidth 
                                                    onChange={e => setNumber(e.target.value)}
                                                />
                                                
                                                <p>Edit Email</p>
                                                <TextField
                                                    id="newnotes"
                                                    label="New Email"
                                                    placeholder="Write new email here"
                                                    multiline
                                                    variant="outlined"
                                                    color="secondary"
                                                    fullWidth 
                                                    onChange={e => setEmail(e.target.value)}
                                                />
                                                <br/>
                                                <br/>
                                                <section className="saveChanges">
                                                    <Button
                                                        type="save"
                                                        variant="contained"
                                                        color="secondary"
                                                        style={{minWidth: "85px", minHeight:"35px"}}>
                                                        Save changes
                                                    </Button>
                                                </section>
                                            </form>
                                        </div>

                                    </Popup>
                                </Box>
                                <>
                                <p><b>Mobile: </b> <span className="contactInfo">{pnumber}</span></p>
                                <p><b>Email: </b> <span className="contactInfo">{pemail}</span></p> 
                                </>    
                            </Box>
                    </div>
                </div>
                <div style = {{"padding-top": "15px", margin: "8px"}}>          

                    <div className="company-task">
                    {/*Company info div */}
                    <div className="company-info">
                        <Box 
                            boxShadow={4}
                            borderRadius={5}
                            style={{ padding: "15px", width:"25em", marginRight:"2em", height:"15em"}}>
                                <Box display="flex" justifyContent="space-between">
                                     <h3>Company Information</h3>
                                    <Popup trigger={<IconButton><Pen /></IconButton>} position="bottom center">
                                        <div>
                                            <form onSubmit={submitCompInfo}>
                                                <p>Edit Name</p>
                                                <TextField
                                                    id="newnotes"
                                                    label="New Name"
                                                    placeholder="Write new name here"
                                                    multiline
                                                    variant="outlined"
                                                    color="secondary"
                                                    fullWidth 
                                                    onChange={e => setName(e.target.value)}
                                                />
                                                <p>Edit Location</p>
                                                <TextField
                                                    id="newnotes"
                                                    label="New Location"
                                                    placeholder="Write new location here"
                                                    multiline
                                                    variant="outlined"
                                                    color="secondary"
                                                    fullWidth 
                                                    onChange={e => setLocation(e.target.value)}
                                                />
                                                <p>Edit Position</p>
                                                <TextField
                                                    id="newnotes"
                                                    label="New Position"
                                                    placeholder="Write new position here"
                                                    multiline
                                                    variant="outlined"
                                                    color="secondary"
                                                    fullWidth 
                                                    onChange={e => setPosition(e.target.value)}
                                                />
                                                <p>Edit Department</p>
                                                <TextField
                                                    id="newnotes"
                                                    label="New Department"
                                                    placeholder="Write new department here"
                                                    multiline
                                                    variant="outlined"
                                                    color="secondary"
                                                    fullWidth 
                                                    onChange={e => setDepartment(e.target.value)}
                                                />
                                                <br/>
                                                <br/>
                                                <section className="saveChanges">
                                                    <Button
                                                        type="save"
                                                        variant="contained"
                                                        color="secondary"
                                                        style={{minWidth: "85px", minHeight:"35px"}}>
                                                        Save changes
                                                    </Button>
                                                </section>
                                            </form>
                                        </div>

                                    </Popup>
                                    </Box>
                                    <p><b>Name: </b> <span className="contactInfo">{pname}</span></p>
                                    <p><b>Location: </b> <span className="contactInfo">{plocation}</span></p>
                                    <p><b>Position: </b> <span className="contactInfo">{pposition}</span></p>
                                    <p><b>Department: </b> <span className="contactInfo">{pdepartment}</span></p>
                                </Box>
                            
                    </div>    
                    
                    {/*Task info */}
                    <div className="task-info">    
                            <Box 
                                boxShadow={4}
                                borderRadius={5}
                                style={{ padding: "15px", width:"25em", height:"15em"}}>
                                <Box display="flex" justifyContent="space-between">
                                    <h3>Task Information</h3>
                                    <Popup trigger={<IconButton><Pen /></IconButton>} position="bottom center">
                                        <div>
                                            <p>Edit Description</p>
                                            <form onSubmit={submitTaskInfo}>
                                                <TextField
                                                    id="newnotes"
                                                    label="New Description"
                                                    placeholder="Write new description here"
                                                    multiline
                                                    variant="outlined"
                                                    color="secondary"
                                                    fullWidth 
                                                    onChange={e => setDescription(e.target.value)}
                                                />
                                                    
                                                <p>Edit Timeline</p>
                                                <TextField
                                                    id="newnotes"
                                                    label="New Timeline"
                                                    placeholder="Write new timeline here"
                                                    multiline
                                                    variant="outlined"
                                                    color="secondary"
                                                    fullWidth 
                                                    onChange={e => setTimeline(e.target.value)}
                                                />
                                                <br/>
                                                <br/>
                                                <section className="saveChanges">
                                                    <Button
                                                        type="save"
                                                        variant="contained"
                                                        color="secondary"
                                                        style={{minWidth: "85px", minHeight:"35px"}}>
                                                        Save changes
                                                    </Button>
                                                </section>
                                            </form>
                                        </div>

                                    </Popup>
                                </Box>
                            <p><b>High level description: </b> <span className="contactInfo">{pdescription}</span></p>
                            <p><b>Timeline: </b> <span className="contactInfo">{ptimeline}</span></p>
                            </Box>
                        </div>
                    </div>
                </div>
                <Grid container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="centre"
                    spacing={24}
                >
                    <Grid item spacing={5}>
                        <Box 
                            boxShadow={4}
                            borderRadius={5}
                            style={{ padding: "15px", margin: "8px" , width:"45vw", height:"10em", marginTop:"2em"}}>
                            <Box display="flex" justifyContent="space-between">
                                <h3>Notes</h3>
                                <Popup trigger={<IconButton><Pen /></IconButton>} position="bottom center">
                                    <div>
                                        <form onSubmit={submitNotes}>
                                        <TextField
                                            id="newnotes"
                                            label="Editing notes"
                                            placeholder="Write new notes here"
                                            multiline
                                            variant="outlined"
                                            color="secondary"
                                            fullWidth 
                                            onChange={e => setNotes(e.target.value)}
                                            />
                                            <br/>
                                            <br/>
                                            <section className="saveChanges">
                                                <Button
                                                    type="save"
                                                    variant="contained"
                                                    color="secondary"
                                                    style={{minWidth: "85px", minHeight:"35px"}}>
                                                    Save changes
                                                </Button>
                                            </section>
                                        </form>
                                    </div>
                                </Popup>
                            </Box>
                        <section class="notes">
                            <TextField
                            id="notes"
                            // label="Editing notes"
                            placeholder="Write notes here"
                            multiline
                            variant="outlined"
                            color="secondary"
                            fullWidth 
                            value={pnotes}
                            />
                        </section>
                        </Box>
                    </Grid>    
                </Grid>
            </div>
        </div>
        </>
        
    )    
}