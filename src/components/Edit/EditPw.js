//////////////////////////////
// Author(s): Nicholas
// Date Made: 26/09/2021
//////////////////////////////
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './EditPw.css'; 
import {useHistory} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const API_URL = "https://chetohs-crm-backend.herokuapp.com/";

async function editPw(password) {
    return fetch(API_URL + "changePassword/", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(password)
    })
      .then(data => data.json())
}

export default function EditPw() {
    const [username, setUserName] = useState();
    const [oldPw, setOldPw] = useState();
    const [newPw, setNewPw] = useState();
    const [confirmPw, setConfirmPw] = useState();
    let history = useHistory(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const res = await editPw({
            username,
            oldPw,
            newPw,
            confirmPw
        })
        
        // Successfully change password
        if (res.status) {
            window.location.href = '/';
        }
    }

    return(
        <section className="editPw-wrapper">
            <img src="/logo.png" alt="logo" width="207" height="55"/>
            <form onSubmit={handleSubmit}>
            <br/>

            {/* need to change colour/set up theme */}
            <section className="headerBox">
                <Box
                border={1}
                bgcolor="secondary.main"
                borderRadius={16}
                borderColor="secondary.main"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width={370}
                height={56}
                boxShadow={4}
                position="absolute"
                top={70}>
                    <h2>Change password</h2>
                </Box>
            </section>
            <section className="credentialsBox">
                <Box
                borderRadius={16}
                width={370}
                height={400}
                boxShadow={6}>
                    <br/>
                    <section className="credentials">
                        <TextField
                            required
                            id="username"
                            label="Username"
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => setUserName(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="oldpw"
                            label="Old Password"
                            type="oldPw"
                            placeholder="At least 8 characters..."
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => setOldPw(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="newpw"
                            label="New Password"
                            type="newPw"
                            placeholder="At least 8 characters..."
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => setNewPw(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="confirmPw"
                            label="Confirm New Password"
                            type="confirmPw"
                            placeholder="At least 8 characters..."
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => setConfirmPw(e.target.value)}
                        />
                    </section> 
                    <section className="submission">
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            style={{minWidth: "85px", minHeight:"35px"}}>
                            Submit
                        </Button>
                    </section>
                </Box>
            </section>
            <br/>
            </form>
        </section>
        )
}

EditPw.propTypes = {
    setToken: PropTypes.func.isRequired
};