import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/authReq';

/**
 * Used to set the color of the active path item in the menu
 * Basically makes it obvious which page within the menu the user is actually on currently
 * history param -- gets set by the menu when called with isAuthenticated...
 * ...this allows the history to consistently point to the right page (in theory)
 */
const isActive = (history, path) => {
    // checks the user's history via the
    if (history.location.pathname === path) {
        return { color: '#ff9900' };
    } else {
        return { color: '#ffffff' };
    }
};

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, '/')}
                    to="/"
                >
                    Home
                </Link>
            </li>

            {/* Conditionally shows a user dashboard if they are already logged in */}
            {isAuthenticated() && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, '/user/dashboard')}
                        to="/user/dashboard"
                    >
                        User Dashboard
                    </Link>
                </li>
            )}

            {/* Conditionally shows a signin/signup link if they're NOT logged in */}
            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, '/signin')}
                            to="/signin"
                        >
                            Signin
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, '/signup')}
                            to="/signup"
                        >
                            Signup
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, '/create')}
                            to="/create"
                        >
                            Create Room
                        </Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticated() && (
                <li className="nav-item">
                    <span
                        className="nav-link"
                        style={{ cursor: 'pointer', color: '#ffffff' }}
                        onClick={() =>
                            signout(() => {
                                history.push('/');
                            })
                        }
                    >
                        Signout
                    </span>
                </li>
            )}
        </ul>
    </div>
);

/**
 *  We export with router so that this component gets access to this.props.history
 *  stackOverflow: https://stackoverflow.com/questions/53539314/what-is-withrouter-for-in-react-router-dom
 */

export default withRouter(Menu);
