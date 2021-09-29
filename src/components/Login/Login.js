//////////////////////////////
// Author(s): Zakarya Butt, Nicholas, Rebecca
// Date Made: 07/09/2021
//////////////////////////////
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css'; 
import Auth from '../Authentication/Auth';
import {useHistory} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const API_URL = "https://chetohs-crm-backend.herokuapp.com/";

async function loginUser(credentials) {
    return fetch(API_URL + "login/", {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    let history = useHistory(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Fetch sends the username and password 
        // to the back end which validates against the db and then 
        // returns a response. 
        const res = await loginUser({
            username,
            password
        })

        setToken(res);
    }

    const register = async (e) => {
        e.preventDefault();
        history.push('/register');
    }

    return(
        <section className="login-wrapper">
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
                    <h2>LOGIN</h2>
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
                            id="password"
                            label="Password"
                            type="password"
                            placeholder="At least 8 characters..."
                            variant="outlined"
                            color="secondary"
                            height="56px"
                            width="232px"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </section> 
                    <section className="submission">
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            style={{minWidth: "85px", minHeight:"35px"}}>
                            Sign in
                        </Button>
                    </section>
                </Box>
            </section>
            <br/>
            </form>
            {/*
            <section class="register">
                <button type="register" onClick={register}>Register</button>
            </section>*/}
        </section>
        )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};