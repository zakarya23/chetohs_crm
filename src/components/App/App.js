//////////////////////////////
// Author(s): Nicholas, Zakarya Butt, Rebecca
// Date Made: 08/09/2021
//////////////////////////////

import React, { useState } from 'react';
import {BrowserRouter as Router, BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import UserHome from '../User/UserHome';
import Login from '../Login/Login';
import Register from '../Register/Register';
import useToken from './useToken';
import Profile from '../Profile/Profile'; 
import EditInfo from '../Edit/EditInfo';
import EditPw from '../Edit/EditPw'
import AddContact from '../MainPageComponents/AddContact'; 

function App() {
    const { token, setToken } = useToken();
    // const {isAuth, setIsAuth} = useState(true); 

    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
        <BrowserRouter>
            <Switch>
                {/* User Home Page Route */}
                <Route exact path="/" component={UserHome}/>
                {/* User Profile Route */}
                <Route path="/profile/:id" component={Profile}/>
                {/* Edit user information */}
                <Route path="/edit_information" component={EditInfo}/>
                {/* Edit user pw */}
                <Route path="/edit_password" component={EditPw}/>
                {/* Add Contact Route  */}
                <Route path="/addContact" component={AddContact}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;