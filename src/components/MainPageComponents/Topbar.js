import React from 'react';
import './Components.css';
import Box from '@material-ui/core/Box';

import { IconButton, AppBar, Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NotificationsIcon from '@material-ui/icons/Notifications'; 

function Topbar () {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <section className = 'topbar' >
            <AppBar position="Fixed" color="white" boxShadow={4}>
                <Toolbar>
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
                        style = {{position: "absolute", top: "50px"}}
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
