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
import Moment from 'react-moment';
import Calendar from 'react-calendar'
// import 'moment-timezone';
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
    KeyboardDateTimePicker
} from '@material-ui/pickers';

import Avatar from "./pngegg.png";

export default function Profile({props}) {
    const config = require('../Configuration/config.json');
    const link =  config.API_URL; 
    var [customer, setCustomer] = useState(); 
    var [company, setCompany] = useState(); 
    var [progress, setProgress] = useState();
    var [priority, setPriority] = useState();
    
    var [notes, setNotes] = useState();
    var [number, setNumber] = useState();
    var [email, setEmail] = useState();

    var [name, setName] = useState();
    var [location, setLocation] = useState();
    var [position, setPosition] = useState();
    var [department, setDepartment] = useState();
    var [description, setDescription] = useState();
    var [timeline, setTimeline] = useState();
    let {id} = useParams();

    const [lastContact, setLastContact] = useState(new Date());
    const [nextMeeting, setNextMeeting] = useState(new Date());

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
                    var prog = cust.progress;
                    var priority = cust.priority;
                    setCustomer(cust); 
                    setCompany(comp); 
                    setProgress(prog);
                    setPriority(priority);
                })
            }
            catch (err) {
                if ((err)) return alert('check your connection');
                throw err;
            }

        }

        getCustomer();  
    })

    useEffect( ()=> { 
        if (notes) {
            try {
                var req = {"notes":notes}; 
                axios.post(link + 'user/notes/' + id, req); 
            }
            catch (err) {
                if ((err)) return alert('check your connection');
                throw err;
            }
        }
        if (description) {
            try {
                var req = {"description":description}; 
                axios.post(link + 'user/description/' + id, req); 
            }
            catch (err) {
                if ((err)) return alert('check your connection');
                throw err;
            }
        }
        if (timeline) {
            try {
                var req = {"timeline":timeline}; 
                axios.post(link + 'user/timeline/' + id, req); 
            }
            catch (err) {
                if ((err)) return alert('check your connection');
                throw err;
            }
        }
        if (number) {
            try {
                var req = {"number":number}; 
                axios.post(link + 'user/number/' + id, req); 
            }
            catch (err) {
                if ((err)) return alert('check your connection');
                throw err;
            }
        }
        if (email) {
            try {
                var req = {"email":email}; 
                axios.post(link + 'user/email/' + id, req); 
            }
            catch (err) {
                if ((err)) return alert('check your connection');
                throw err;
            }
        }
        if (name) {
            try {
                var req = {"name":name}; 
                axios.post(link + 'user/name/' + id, req); 
            }
            catch (err) {
                if ((err)) return alert('check your connection');
                throw err;
            }
        }
        if (location) {
            try {
                var req = {"location":location}; 
                axios.post(link + 'user/location/' + id, req); 
            }
            catch (err) {
                if ((err)) return alert('check your connection');
                throw err;
            }
        }
        if (position) {
            try {
                var req = {"position":position}; 
                axios.post(link + 'user/position/' + id, req); 
            }
            catch (err) {
                if ((err)) return alert('check your connection');
                throw err;
            }
        }
        if (department) {
            try {
                var req = {"department":department}; 
                axios.post(link + 'user/department/' + id, req); 
            }
            catch (err) {
                if ((err)) return alert('check your connection');
                throw err;
            }
        }
        

    }, [notes, description, timeline, number, email, name, location, position, department]); 


    async function changeProgress(progress) {
        var req = {"progress": progress}
        setProgress(progress);
        try {
            axios.post(link + 'user/progress/' + id, req)
        }
        catch (err) {
            if ((err)) return alert('check your connection');
            throw err;
        }
    }

    async function changePriority(priority) {
        var req = {"priority": priority}
        setPriority(priority);
        try {
            axios.post(link + 'user/priority/' + id, req)
        }
        catch (err) {
            if ((err)) return alert('check your connection');
            throw err;
        }
    } 

    async function changeLastContact(lcDate) {
        var req = {"lastContact": lcDate}
        setLastContact(lcDate);
        try {
            axios.post(link + 'user/lastContact/' + id, req)
        }
        catch (err) {
            if ((err)) return alert('check your connection');
            throw err;
        }
    }

    async function changeNextMeeting(nmDate) {
        var req = {"meeting": nmDate}
        setNextMeeting(nmDate);
        try {
            axios.post(link + 'user/meeting/' + id, req)
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
                        defaultValue={customer && customer.progress}
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
                        defaultValue={customer && customer.priority}
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
                                value={customer && customer.lastContact}
                                onChange={e => changeLastContact(e)}
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
                                value={customer && customer.meeting}
                                onChange={e => changeNextMeeting(e)}
                                format="dd/MM/yyyy hh:mm"
                                />
                            </MuiPickersUtilsProvider>
                            </>   
                        </Box>
                    </Grid>
                </Grid>
            </div>

            <div className="rightContainer">
                <Grid container
                    direction="row"
                    // justifyContent=""
                    alignItems="center"
                >
                    <div className="infoContainer">
                        {customer  && 
                            <>
                            <h1>{customer.firstName} {customer.familyName}</h1>
                            <p><b>Gender: </b> {customer.gender}</p>
                            </>
                        }
                    </div>
                    <Grid item spacing={4} style = {{position: "relative", right: "2.25%"}}>
                        <Box 
                            boxShadow={4}
                            borderRadius={5}
                            style={{ padding: "15px", margin: "10px", width:"25em", marginTop:"2em"}}>
                            <Box display="flex" justifyContent="space-between">
                                <h3>Contact</h3>
                                <Popup trigger={<IconButton><Pen /></IconButton>} position="bottom center">
                                    <div>
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
                                    </div>

                                </Popup>
                            </Box>
                            {customer &&
                            <>
                            <p><b>Mobile: </b> <span className="contactInfo">{customer.phoneNumber}</span></p>
                            <p><b>Email: </b> <span className="contactInfo">{customer.email}</span></p> 
                            </>
                            }     
                        </Box>
                    </Grid>
                </Grid>

                <Grid container
                    direction="row"
                    // justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item spacing={5}>
                        <Box 
                            boxShadow={4}
                            borderRadius={5}
                            style={{ padding: "15px", margin: "8px", width:"25em", marginRight:"7.5em", height:"15em"}}>
                            <Box display="flex" justifyContent="space-between">
                                <h3>Company Information</h3>
                                <Popup trigger={<IconButton><Pen /></IconButton>} position="bottom center">
                                    <div>
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
                                    </div>

                                </Popup>
                            </Box>
                            {company &&
                            <>
                                <p><b>Name: </b> <span className="contactInfo">{company.name}</span></p>
                                <p><b>Location: </b> <span className="contactInfo">{company.location}</span></p>
                                <p><b>Position: </b> <span className="contactInfo">{company.position}</span></p>
                                <p><b>Department: </b> <span className="contactInfo">{company.department}</span></p>
                            </>
                            }
                        </Box>
                    </Grid>
                    <Grid item spacing={5}>
                        <Box 
                            boxShadow={4}
                            borderRadius={5}
                            style={{ padding: "15px", width:"25em", height:"15em"}}>
                            <Box display="flex" justifyContent="space-between">
                                <h3>Task Information</h3>
                                <Popup trigger={<IconButton><Pen /></IconButton>} position="bottom center">
                                    <div>
                                        <p>Edit Description</p>
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
                                    </div>

                                </Popup>
                            </Box>
                        <p><b>High level description: </b> <span className="contactInfo">{customer && customer.description}</span></p>
                        <p><b>Timeline: </b> <span className="contactInfo">{customer && customer.timeline}</span></p>
                        </Box>
                    </Grid>
                </Grid>
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
                            style={{ padding: "15px", margin: "8px" , width:"50vw", height:"10em", marginTop:"2em"}}>
                            <Box display="flex" justifyContent="space-between">
                                <h3>Notes</h3>
                                <Popup trigger={<IconButton><Pen /></IconButton>} position="bottom center">
                                    <div>
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
                            value={customer && customer.notes}
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