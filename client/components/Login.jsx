import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth/index';

/**
 * This is the Login Screen;
 * It is accessed/routed FROM the viewRooms page, specifically from the Header component;
 * It should re-route back to viewRooms;
 *
 * This code was implemented by : Lance J -- please reach out w/ questions or modifications
 */

const Login = () => {
    // Hooks format: [value, setterFuncName] = useState('initialVariableValue')
    // we ask for a name, email, password
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;

    // higher order -- function that returns a function
    const handleChange = nameOfEvent => event => {
        setValues({
            // spread the existing values
            ...values,
            // overwrite error to be false
            error: false,
            //
            [nameOfEvent]: event.target.value
        });
    };

    const clickSubmit = event => {
        // prevents browser from refreshing
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        // destructures the email/password from the event and passes it as a 'user' object to signin method --> calls then invokes authenticate
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    // renders the actual signin form on the page
    // TO DO: Eslint is throwing errors because labels are not a11y compliant. Needs fixing
    const signinForm = () => {
        return (
            <div className="login-container">
                <form>
                    <h1 className="heading">
                        Please log in to join a chat room
                    </h1>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input
                            onChange={handleChange('email')}
                            type="text"
                            className="form-control"
                            value={email}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input
                            onChange={handleChange('password')}
                            type="password"
                            className="form-control"
                            value={password}
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={clickSubmit}
                        className="btn btn--primary"
                    >
                        Log in
                    </button>
                </form>
            </div>
        );
    };

    const showError = () => {
        return (
            <div
                className="alert alert--danger"
                style={{ display: error ? '' : 'none' }}
            >
                {error}
            </div>
        );
    };

    // Placeholder func in case something lags (probably during some async stuff) but we need to display something for the end user
    const showLoading = () => {
        if (loading) {
            return (
                <div className="alert alert--info">
                    <h2>Loading...</h2>
                </div>
            );
        }
    };

    const redirectUser = () => {
        // Placeholder functionality: could be modified to redirect to /user/dashboard when it is built
        // if (redirectToReferrer) {
        //     return <Redirect to="/" />;
        // }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        <>
            <h1>Sign In</h1>
            {showLoading()}
            {showError()}
            {signinForm()}
            {redirectUser()}
        </>
    );
};
export default Login;
