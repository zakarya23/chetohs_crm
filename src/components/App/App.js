////////////////////////////////////////////////////////////
// Author(s): Nicholas, Zakarya Butt, Rebecca Ye
// Date Made: 08/09/2021
////////////////////////////////////////////////////////////

import React  from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import UserHome from '../User/UserHome';
import Login from '../Login/Login';
import useToken from './useToken';
import Profile from '../Profile/Profile'; 
import EditInfo from '../Edit/EditInfo';
import AddContact from '../MainPageComponents/AddContact'; 
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './Theme';

function App() {

    const { token, setToken } = useToken(); 
    
    if(!token) {
        return (
            <ThemeProvider theme={theme}>
                <Login setToken={setToken} />
            </ThemeProvider>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    {/* User Home Page Route */}
                    <Route exact path="/" component={UserHome}/>
                    {/* User Profile Route */}
                    <Route exact path="/user/profile/:id" component={Profile}/>
                    {/* Edit user information */}
                    <Route path="/edit_information" component={EditInfo}/>
                    {/* Add Contact Route  */}
                    <Route path="/addContact" component={AddContact}/>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
