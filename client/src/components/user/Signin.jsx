import React, { useState } from 'react';
import Layout from '../Layout';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../../auth/authReq';

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    // checks whether the user is an admin or nah
    const { user } = isAuthenticated();

    // higher order -- function that returns a function
    const handleChange = nameOfEvent => event => {
        setValues({
            ...values,
            error: false,
            [nameOfEvent]: event.target.value
        });
    };

    const clickSubmit = event => {
        // prevents browser from refreshing
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        // destructures the email/password from the event and passes it as a 'user' object to signup method
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

    const signinForm = () => {
        return (
            <form>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input
                        onChange={handleChange('email')}
                        type="text"
                        className="form-control"
                        value={email}
                    />
                </div>

                <div className="form-group">
                    <label id="test" className="text-muted">
                        Password
                    </label>
                    <input
                        onChange={handleChange('password')}
                        type="text"
                        className="form-control"
                        value={password}
                    />
                </div>
                <button onClick={clickSubmit} className="btn btn-primary">
                    Submit
                </button>
            </form>
        );
    };

    const showError = () => {
        return (
            <div
                className="alert alert-danger"
                style={{ display: error ? '' : 'none' }}
            >
                {error}
            </div>
        );
    };

    const showLoading = () => {
        if (loading) {
            return (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            );
        }
    };

    const redirectUser = () => {
        if (redirectToReferrer) {
            // if the user is an admin, redirect to admin dash
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        <Layout
            title="Sign In"
            description="Sign in to app"
            className="container col-md-8 offset-md-2"
        >
            {showLoading()}
            {showError()}
            {signinForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Signin;
