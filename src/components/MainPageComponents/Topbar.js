import React from 'react';
import './Components.css';
import Box from '@material-ui/core/Box';

import { IconButton, AppBar, Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NotificationsIcon from '@material-ui/icons/Notifications'; 
import MenuIcon from '@material-ui/icons/Menu';


function Topbar () {
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
    return (
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
                    style = {{position: "fixed", top: "50px"}}
                >
                    <MenuItem onClick={handleClose}>
                        <Button
                            href="/addContact"
                            variant="contained"
                            color="secondary"
                            style={{minWidth: "254px", minHeight:"56px"}}>
                                +  ADD CONTACT
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
                        <NotificationsIcon onClick = {handleClick}/> 
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                        style = {{position: "absolute", top: "10%"}}
                    >
                        <MenuItem onClick={handleClose}>
                            <div className = "notifications">
                                <div className = "timestamp">1 hour ago</div>
                                <div className = "content"> Meeting with Jane Doe, 12pm today</div>
                                <div className="divider">
                                    <div className="line" />
                                </div>
                            </div>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <div className = "notifications">
                                <div className = "timestamp">1 day ago</div>
                                <div className = "content"> 7 days since contact with John Doe</div>
                                <div className="divider">
                                    <div className="line" />
                                </div>
                            </div>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <div className = "notifications">
                                <div className = "timestamp">2 days ago</div>
                                <div className = "content"> Meeting with John Doe, 3pm today</div>
                                <div className="divider">
                                    <div className="line" />
                                </div>
                            </div>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </section>
  )
}


export default Topbar