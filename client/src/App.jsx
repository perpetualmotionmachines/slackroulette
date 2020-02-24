import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './components/user/Signup';
import Signin from './components/user/Signin';
import Home from './components/Home.jsx';
import UserRoute from './auth/UserRoute';
import Dashboard from './components/user/UserDashboard';
import CreateRoom from './components/CreateRoom';
import './stylesheets/claraStyles.css';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/create" exact component={CreateRoom} />
                <UserRoute path="/user/dashboard" exact component={Dashboard} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
