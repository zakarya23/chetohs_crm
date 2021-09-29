//////////////////////////////
// Author(s): Zakarya Butt, Terry 
// Date Made: 08/09/2021
//////////////////////////////

import React, {Component} from 'react'; 
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Popup from './Popup';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
// import { MyContext } from './Provider';

export default class ClientToggle extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            data:[], 
            buttonPopup: false,
            setButtonPopup: false,
            anchorEl1: false,
            anchorEl: false,
            checked: [false,false,false,false,false],
            checked1: [false,false,false],
        }
    }

    async getCustomers() {
        // Sends a request to the backend to get all customers
        axios.get('https://chetohs-crm-backend.herokuapp.com/user/customers').then(res => {
            var data = res.data.customers; 
            this.setState({data:data})
        })
    }

    componentDidMount() {
        this.getCustomers(); 
    }
    

    takeToProfile(id) {
        
        var pathname = "/user/profile/" + id; 
        console.log(pathname);
        
    }

    togglePop = () => {
        this.setState({
            buttonPopup: !this.state.buttonPopup
        });
    };

    handleClick1 = () => {
        this.setState({
            anchorEl1: true
        })
    }

    handleClose1 = () => {
        this.setState({
            anchorEl1: false
        })
    }
    
    
    handleClick = () => {
        this.setState({
            buttonPopup: true,
            anchorEl: true
        })
    }

    handleClose = () => {
        this.setState({
            anchorEl: false
        })
    }

    //Checked change handler for progress filter

    handleChange1 = (event) => {
        this.setState({
            checked: [
                event.target.checked,
                event.target.checked,
                event.target.checked,
                event.target.checked,
                event.target.checked,]
        })
    };
    handleChange2 = (event) => {
        this.setState({
            checked: [
                event.target.checked,
                this.state.checked[1],
                this.state.checked[2],
                this.state.checked[3],
                this.state.checked[4],
            ]
        })
    };
    handleChange3 = (event) => {
        this.setState({
            checked: [
                this.state.checked[0],
                event.target.checked,
                this.state.checked[2],
                this.state.checked[3],
                this.state.checked[4],
            ]
        })
    };
    handleChange4 = (event) => {
        this.setState({
            checked: [
                this.state.checked[0],
                this.state.checked[1],
                event.target.checked,
                this.state.checked[3],
                this.state.checked[4],
            ]
        })
    };
    handleChange5 = (event) => {
        this.setState({
            checked: [
                this.state.checked[0],
                this.state.checked[1],
                this.state.checked[2],
                event.target.checked,
                this.state.checked[4],
            ]
        })
    };
    handleChange6 = (event) => {
        this.setState({
            checked: [
                this.state.checked[0],
                this.state.checked[1],
                this.state.checked[2],
                this.state.checked[3],
                event.target.checked,
            ]
        })
    };

    //Check change handler for priority filter
    
    handleChange7 = (event) => {
        this.setState({
            checked1: [
                event.target.checked,
                event.target.checked,
                event.target.checked,
            ]
        })
    };

    handleChange8 = (event) => {
        this.setState({
            checked1: [
                event.target.checked1,
                this.state.checked1[1],
                this.state.checked1[2],
            ]
        })
    };
    handleChange9 = (event) => {
        this.setState({
            checked1: [
                this.state.checked1[0],
                event.target.checked1,
                this.state.checked1[2],
            ]
        })
    };
    handleChange10 = (event) => {
        this.setState({
            checked1: [
                this.state.checked1[0],
                this.state.checked1[1],
                event.target.checked1,
            ]
        })
    };

    




    
    render() {
        const childrenProgress = (
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <FormControlLabel
                label="New"
                control={<Checkbox checked={this.state.checked[0]} onChange={this.handleChange2} />}
            />
            <FormControlLabel
                label="Invited"
                control={<Checkbox checked={this.state.checked[1]} onChange={this.handleChange3} />}
            />
            <FormControlLabel
                label="Met"
                control={<Checkbox checked={this.state.checked[2]} onChange={this.handleChange4} />}
            />
            <FormControlLabel
                label="Negotiation"
                control={<Checkbox checked={this.state.checked[3]} onChange={this.handleChange5} />}
            />
            <FormControlLabel
                label="Conclude"
                control={<Checkbox checked={this.state.checked[4]} onChange={this.handleChange6} />}
            />
            </Box>
        );
        const childrenPriority = (
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <FormControlLabel
                label="High"
                control={<Checkbox checked1={this.state.checked1[0]} onChange={this.handleChange8} />}
            />
            <FormControlLabel
                label="Medium"
                control={<Checkbox checked1={this.state.checked1[1]} onChange={this.handleChange9} />}
            />
            <FormControlLabel
                label="Low"
                control={<Checkbox checked1={this.state.checked1[2]} onChange={this.handleChange10} />}
            />
            </Box>
            
        );
        return (
            <div className = "lowerpart">
                {/* <MyContext>
                    {(context) => {
                        if (context) {
                            <p>true</p>
                        }
                        else {
                            <p>false</p>
                        }
                    }} */}
                    <div className = "sidebar">
                        <div className = "p" style ={{fontSize: "25px", paddingLeft: "5px", paddingBottom: "10px",textAlign: "left", textDecoration: "underline"}}>
                            Filter By:
                        </div>
                        <div className = "filterBar">
                            <div className= "p" style ={{textAlign: "left"}}>
                                Progress
                            </div>
                            <div style ={{paddingLeft: "10px"}}>
                                {childrenProgress}
                            </div>
                            <div className= "p" style ={{textAlign: "left"}}>
                                Priority
                            </div>
                            <div style ={{paddingLeft: "10px"}}>
                                {childrenPriority}
                            </div>
                        </div>
                    </div>
                    <div className = "clients" >
                        {this.state.data.map(d => (
                            <>
                                {/* A loop to handle customers directly from the database  */}
                                <button className = "client" onClick={()=> window.location.href='/user/profile/' + d._id}>
                                    <p className = "name">{d.firstName} {d.familyName}</p>
                                    <p className = "status">{d.status}</p>
                                    <p className = "progress" style ={{color: d.progress === 'High' ? "Red" : 'Medium' ? "Orange" : "Yellow"}}>{d.progress}</p>
                                </button>
                                <svg width="1104" height="4" viewBox="0 0 1104 4" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <path d="M0 2L1104 2.35158" stroke="#C4C4C4" stroke-opacity="0.5" stroke-width="2.08177"/>
                                </svg>
                            </>
                        ))}  
                    </div>
                    
                {/* </MyContext> */}
            </div>
        )
    }
}