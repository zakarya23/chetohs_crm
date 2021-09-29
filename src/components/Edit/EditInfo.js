//////////////////////////////
// Author(s): Nicholas
// Date Made: 26/09/2021
//////////////////////////////
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './EditInfo.css'; 
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const API_URL = "https://chetohs-crm-backend.herokuapp.com/";

async function editInfo(information) {
    return fetch(API_URL + "edit/", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(information)
    })
      .then(data => data.json())
}

export default function EditInfo() {
    const [username, setUserName] = useState();
    const [firstName, setFirstName] = useState();
    const [familyName, setFamilyName] = useState();
    const [email, setEmail] = useState();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const res = await editInfo({
            username,
            firstName,
            familyName,
            email
        })
        
        // Successfully edited information
        if (res.status) {
            window.location.href = '/';
        }
    }

    return(
        <section className="editInfo-wrapper">
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
                            id="firstname"
                            label="First Name"
                            type="firstname"
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="familyName"
                            label="Family Name"
                            type="familyName"
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => setFamilyName(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                            required
                            id="email"
                            label="Email"
                            type="email"
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => setEmail(e.target.value)}
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

EditInfo.propTypes = {
    setToken: PropTypes.func.isRequired
};