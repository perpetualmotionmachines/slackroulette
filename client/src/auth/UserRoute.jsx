import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './authReq';

/**
 * Not 100% sure what 'component' is doing here, should probably read the docs lolol
 * Hypothesis: used to conditionally render the userdashboard but idek
 * Probably need to come back to this and see where PrivateRoute gets invoked (App.jsx?) to see what props get passed
 *
 * Pretty sure the <Redirect state of props.location comes from the history.location we exported in Menu (??)
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/signin',
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;
