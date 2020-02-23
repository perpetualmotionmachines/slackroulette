import React, { Component, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

const Header = () => {
    // check if user is authenticated, makes a get request to server using useEffect
    // gotta check with server and make sure we're getting a cookieId for the response!!
    const [auth, setAuth] = useState({ cookieId: null });
    //will uncomment after server side is set up
    // useEffect(() => {
    //     async function fetchData() {
    //         const fetchRes = await fetch('/');
    //         const data = await fetchRes.json();
    //         setAuth({ cookieId: data });
    //     }
    //     fetchData();
    // }, []);

    // f(x) to check if cookie exists
    const isAuthenticated = () => {
        if (auth.cookieId !== null) {
            return true;
        }
        return false;
    };

    // render header based on authentication
    return (
        <div className="header">
            <header>
                <h2>Slack Roulette</h2>
            </header>
            <div className="nav-bar">
                {!isAuthenticated() && (
                    <div>
                        <Link to={`/login`}>
                            <button className="loginButton">Login</button>
                        </Link>
                        <Link to={`/signup`}>
                            <button className="signUpButton">Sign Up</button>
                        </Link>
                    </div>
                )}
                {isAuthenticated() && (
                    <div>
                        <Link to={`/create`}>
                            <button className="createRoom">Create Room</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default withRouter(Header);
