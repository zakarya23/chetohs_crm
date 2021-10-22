//////////////////////////////////////////////////////////////
// Author(s): Terry Tran, Zakarya Butt, Rebecca Ye, Nicholas Ang
// Date Made: 09/09/2021
//////////////////////////////////////////////////////////////

import React, { useState ,useEffect} from 'react';
import '../MainPageComponents/Components.css';
import SearchBar from 'material-ui-search-bar';
import axios from 'axios';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import 'reactjs-popup/dist/index.css';
import Sort from '@material-ui/icons/Sort';
import Popup from 'reactjs-popup';
import { IconButton, AppBar, Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NotificationsIcon from '@material-ui/icons/Notifications'; 
import MenuIcon from '@material-ui/icons/Menu';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import Badge from '@material-ui/core/Badge';

function UserHome() {
	const config = require('../Configuration/config.json');
	const link =  config.API_URL; 
	// For storing customers and notificaions for meetings. 
	const [customers, setCustomers] = useState();
	const [meetings, setMeetings] = useState();
	const [lastContacts, setLastContacts] = useState();
	// For search
	const [search, setSearch] = useState(false);  
	const [words, setSearchWord] = useState();
	// For progress
	const [newCustomer, setNew] = useState(false);
	const [invite, setInvite] = useState(false);
	const [met, setMet] = useState(false);
	const [negotiation, setNegotiation] = useState(false);
	const [conclude, setConclude] = useState(false);
	// For priority
	const [high, setHigh] = useState(false);
	const [medium, setMedium] = useState(false);
	const [low, setLow] = useState(false);
	// For sorting alphabetically
	const [alpha, setAlpha] = useState(false);

	const [notifications, setNotifications] = useState();
	
	const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorE2, setAnchorE2] = React.useState(null);
    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorE2);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseMenu = () => {
        setAnchorE2(null);
    };

	const handleNotificationsOpen = (event) => {
        setAnchorEl(event.currentTarget);
		if (meetings) {
			for (var i = 0; i < meetings.length; i++) {
				var cust = meetings[i];
				try {
					axios.post(link + 'user/falseNotifyM/' + cust._id);
				}
				catch (err) {
					if ((err)) return alert('check your connection');
					throw err;
				}
			}
		}
		if (lastContacts) {
			for (var i = 0; i < lastContacts.length; i++) {
				var cust = lastContacts[i];
				try {
					axios.post(link + 'user/falseNotifyLC/' + cust._id);
				}
				catch (err) {
					if ((err)) return alert('check your connection');
					throw err;
				}
			}
		}
    };

	const handleNotificationClose = () => {
		setAnchorEl(null);
		setNotifications(0);
	}

    const handleMenu = (event) => {
        setAnchorE2(event.currentTarget);
    };

    const logOut = async (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = '/';
    }

    const editInfo = async (e) => {
        e.preventDefault();
        window.location.href = '/edit_information';
    }

	// If we detect a change in the search property then this is run.
	useEffect(() => {
		var filter = newCustomer || invite || met || negotiation || conclude || high || medium || low || alpha; 
		if (!search && !filter) {
			getCustomers();
		}
	}, [search]); 

	const getSearchAndFilter = (w) => {
		var filter = newCustomer || invite || met || negotiation || conclude || high || medium || low || alpha;
		const filters = {"new":newCustomer, "invite": invite, "met": met, "negotiation":negotiation, "conclude":conclude, "high":high, "medium":medium, "low":low, "alpha": alpha};  
		const req = {"words":w, "filters": filters, "search": search, "filter": filter}; 
		axios.post(link + 'user/searchFilter', req).then(res => {
			var data = res.data.customers; 
			var cust = data; 
			setCustomers(cust);
		})
	}

	// If we detect a change in the filter then this is run.
	useEffect(()=> { 
		var filter = newCustomer || invite || met || negotiation || conclude || high || medium || low || alpha;  
		if (!filter && !search) {
				getCustomers(); 
				
		}
		else if (filter && search) {
			getSearchAndFilter(words); 
		}
		else if (search) {
			const req = {"words":words}; 
			axios.post(link + 'user/search', req).then(res => {
			var data = res.data.customers; 
			setSearch(true);
			var cust = data; 
			setCustomers(cust);
		  })
		}
		else {
			const filters = {"new":newCustomer, "invite": invite, "met": met, "negotiation":negotiation, "conclude":conclude, "high":high, "medium":medium, "low":low, "alpha": alpha}; 
			const req = {"filters": filters, "filter": filter}; 
			axios.post(link + 'user/filter', req).then(res => {
			var data = res.data.customers;
			setCustomers(data);
			}) 
		}

	}, [newCustomer, invite, met, negotiation, conclude, high, medium, low, alpha]); 

	const getCustomers = () => {
	  // Sends a request to the backend to get all customers
		axios.get(link + 'user/customers').then(res => {
			var data = res.data.customers;
			var notifications = 0;
			setCustomers(data); 
			var meetings = [];
			var lastContacts = [];
			for (var i = 0; i < data.length; i++) {
				var customer = data[i];
				if (customer.meeting) {
					var mDate = new Date(customer.meeting)
					var meeting = {
						"_id": customer._id,
						"name": customer.firstName + " " + customer.familyName,
						"date": mDate.getDate() + '/' + (mDate.getMonth() + 1) + '/' + mDate.getFullYear(),
						"hours": mDate.getHours(),
						"minutes": mDate.getMinutes()
					}
					meetings.push(meeting);
					if (customer.toNotifyM === true) {
						notifications++;
					}
				}
				if (customer.lastContact) {
					var toDate = new Date();
					var lcDate = new Date(customer.lastContact);
					var diffInDays = (toDate.getTime() - lcDate.getTime()) / (1000 * 3600 * 24);
					var prio = customer.priority;
					if (prio === "High") {
						if (diffInDays >= 7) {
							var lastContacted = {
								"_id": customer._id,
								"name": customer.firstName + " " + customer.familyName,
								"priority": prio,
								"lcDate": lcDate.getDate() + '/' + (lcDate.getMonth() + 1) + '/' + lcDate.getFullYear(),
								"lcHours": lcDate.getHours(),
								"lcMinutes": lcDate.getMinutes()
							}
							lastContacts.push(lastContacted);
							if (customer.toNotifyLC === true) {
								notifications++;
							}
						}
					}
					else if (prio === "Medium") {
						if (diffInDays >= 14) {
							var lastContacted = {
								"_id": customer._id,
								"name": customer.firstName + " " + customer.familyName,
								"priority": prio,
								"lcDate": lcDate.getDate() + '/' + (lcDate.getMonth() + 1) + '/' + lcDate.getFullYear(),
								"lcHours": lcDate.getHours(),
								"lcMinutes": lcDate.getMinutes()
							}
							lastContacts.push(lastContacted);
							if (customer.toNotifyLC === true) {
								notifications++;
							}
						}
					}
					else if (prio === "Low") {
						if (diffInDays >= 28) {
							var lastContacted = {
								"_id": customer._id,
								"name": customer.firstName + " " + customer.familyName,
								"priority": prio,
								"lcDate": lcDate.getDate() + '/' + (lcDate.getMonth() + 1) + '/' + lcDate.getFullYear(),
								"lcHours": lcDate.getHours(),
								"lcMinutes": lcDate.getMinutes()
							}
							lastContacts.push(lastContacted);
							if (customer.toNotifyLC === true) {
								notifications++;
							}
						}
					}
				}
			}
			setMeetings(meetings);
			setLastContacts(lastContacts);
			setNotifications(notifications);
	  	})
	}
	setInterval(getCustomers, 30 * 60 * 1000);
	
	const searchWord = (e) => {
		// Search will be true here.
		var filter = newCustomer || invite || met || negotiation || conclude || high || medium || low || alpha; 
		if (e === "") {
			setSearch(false); 
			// Check if filters are on otherwise get all custoemrs.
		}
		else if (filter) {
			setSearchWord(e);
			getSearchAndFilter(e); 
		}
		else {
			// Its a name
			setSearchWord(e); 
			const req = {"words":e, "alpha": alpha}; 
			axios.post(link + 'user/search', req).then(res => {
			var data = res.data.customers; 
			setSearch(true);
			var cust = data; 
			setCustomers(cust);
		  })
		}
	}


	const doSearch =  (event) => {
		event.preventDefault(); 
		var filter = newCustomer || invite || met || negotiation || conclude || high || medium || low || alpha;
		var e = words;  
		if (filter) {
			getSearchAndFilter(e); 
		}
		else {
			// Its a name
			setSearchWord(e); 
			const req = {"words":e, "alpha": alpha}; 
			axios.post(link + 'user/search', req).then(res => {
			var data = res.data.customers; 
			setSearch(true);
			var cust = data; 
			setCustomers(cust);
		  })
		}
	}


	return (
	  	<div className="App">
		  	<section className = 'topbar' >
            <AppBar position="Fixed" color="white" boxShadow={4}>
                <Toolbar>
				<IconButton>
                    <MenuIcon onClick = {handleMenu}/> 
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorE2}
                    open={open2}
                    onClose={handleCloseMenu}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
					style = {{position: "absolute", top: "4%"}}
                >
					<MenuItem onClick={handleClose}>
						<Button
							href="/addContact"
							variant="contained"
							color="secondary"
							style={{minWidth: "254px", minHeight:"56px"}}>
								+  Add Contact
						</Button>
					</MenuItem>
					<MenuItem onClick={handleClose}>
						<Button
							type="editInfo"
							variant="contained"
							color="secondary"
							style={{minWidth: "254px", minHeight:"56px"}}
							onClick={editInfo}>
							Edit Information
						</Button>
					</MenuItem>
					<MenuItem onClick={handleClose}>
						<Button
							type="logout"
							variant="contained"
							color="secondary"
							style={{minWidth: "254px", minHeight:"56px"}}
							onClick={logOut}>
							Log out
						</Button>
					</MenuItem>
				</Menu>
                    <Box 
                        flexGrow={1}>
                    </Box>
                    <Box flexGrow={1}>
                        <img class="header" src="/logo.png" alt="logo" width="207" height="55" />
                    </Box>
                    <IconButton>
						<Badge color="secondary" badgeContent={notifications}>
                        	<NotificationsIcon color="action" onClick = {handleNotificationsOpen}/>
						</Badge>
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleNotificationClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                        style = {{position: "absolute", top: "4%"}}
                    >
						{meetings && meetings.map(d => (
							<>
								<MenuItem onClick={()=> window.location.href='/user/profile/' + d._id}>
									<div className = "notifications">
										<div className = "content"> Meeting with {d.name}, on {d.date},
											at {String(d.hours).padStart(2, '0')}:{String(d.minutes).padStart(2, '0')} </div>
										<div className = "divider">
											<div className = "line" />
										</div>
									</div>
								</MenuItem>
							</>
						))}
						{lastContacts && lastContacts.map(lc => (
							<>
								<MenuItem onClick={()=> window.location.href='/user/profile/' + lc._id}>
									<div className = "notifications">
										<div className = "content"> Last contacted {lc.priority} priority customer, {lc.name}, on {lc.lcDate},
											at {String(lc.lcHours).padStart(2, '0')}:{String(lc.lcMinutes).padStart(2, '0')} </div>
										<div className = "divider">
											<div className = "line" />
										</div>
									</div>
								</MenuItem>
							</>
						))}

                    </Menu>
                </Toolbar>
            </AppBar>
        </section>
		<br/>
		<br/>
		<div className="content">
			<div className = "searchbar">
				<form onSubmit={(doSearch)}>        
					{/* can handle searches */}
					<Box
					style = {{position: "relative"}}
					>
						<SearchBar
						value=""
						onChange={e => searchWord(e)}
						placeholder={"Search for contacts"}
						style={{maxWidth: "100%", maxHeight:"25%"}}
						/>
					</Box>
				</form>
			</div>

			<section class="createContact"></section>
			<div className="titles" style ={{fontWeight: 'bold'}}>
				<p className="n">Name</p> 
				<p className="s">Progress</p>  
				<p className="pro">Priority</p>

				<Popup trigger={<IconButton style = {{position : "relative", left : "2vw"}}><Sort /></IconButton>} position="bottom center">
					<div>
						<div className= "p" style ={{textAlign: "left"}}>
							Progress
						</div>
						<div style ={{paddingLeft: "10px"}}>
						<Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
						<FormControlLabel
							label="New"
							control={<Checkbox checked={newCustomer} onChange={() => setNew(!newCustomer)} />}
						/>
						<FormControlLabel
							label="Invited"
							control={<Checkbox checked={invite} onChange={() => setInvite(!invite)} />}
						/>
						<FormControlLabel
							label="Met"
							control={<Checkbox checked={met} onChange={() => setMet(!met)} />}
						/>
						<FormControlLabel
							label="Negotiation"
							control={<Checkbox checked={negotiation} onChange={() => setNegotiation(!negotiation)} />}
						/>
						<FormControlLabel
							label="Conclude"
							control={<Checkbox checked={conclude} onChange={() => setConclude(!conclude)} />}
						/>
						</Box>
					</div>
					<div className= "p" style ={{textAlign: "left"}}>
						Priority
					</div>
					<div style ={{paddingLeft: "10px"}}>
						{/* {childrenPriority} */}
						<Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
						<FormControlLabel
							label="High"
							control={<Checkbox checked={high} onChange={() => setHigh(!high)} />}
						/>
						<FormControlLabel
							label="Medium"
							control={<Checkbox checked={medium} onChange={() => setMedium(!medium)} />}
						/>
						<FormControlLabel
							label="Low"
							control={<Checkbox checked={low} onChange={() => setLow(!low)} />}
						/>
						</Box>
					</div>

					</div>
				</Popup>

				<IconButton onClick={() => setAlpha(!alpha)} style = {{position : "relative", right : "18vw"}}><SortByAlphaIcon /></IconButton>
				
			</div>
		
			<hr width = "73%" align="center" style = {{position: "absolute", left: "15%"}}/>
			<br/>
			
			<div className = "clients" >
				<Box
					borderRadius={16}
					width="73%"
					height="100%"
					boxShadow={6}
					style = {{position: "relative", left: "15%"}}
					>
					{customers && customers.map(d => (
						<>
							{/* A loop to handle customers directly from the database  */}
							<button className = "client" onClick={()=> window.location.href='/user/profile/' + d._id}>
								<p className = "name">{d.firstName} {d.familyName}</p>
								<p className = "status">{d.progress}</p>
								<p className = "progress" style ={{fontWeight: 'bold', color: d.priority === 'High' ? "Red" : d.priority === 'Medium' ? "Orange" : d.priority === "Low" ? "Green": "Yellow"}}>{d.priority}</p>
							</button>
							<hr width="95%" align="center"/>
						</>
					))}
						
					{/* total number of contacts */}
					<div className="total">
						<p>{customers && customers.length} contact(s).</p>
					</div>
					<br/>	
				</Box>   
			</div>
		</div>
	</div>
	);
  }
  
  export default UserHome;