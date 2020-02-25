import React, { useState } from 'react';
import Layout from '../Layout';
import { Link } from 'react-router-dom';
import { signup } from '../../auth/authReq';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, success, error } = values;

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
        setValues({ ...values, error: false });
        // destructures the name/email/password from the event and passes it as a 'user' object to signup method
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                // clear fields on submission
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    };

    const signUpForm = () => {
        return (
            <form>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input
                        onChange={handleChange('name')}
                        type="text"
                        className="form-control"
                        value={name}
                    />
                </div>

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
                    <label className="text-muted">Password</label>
                    <input
                        onChange={handleChange('password')}
                        type="password"
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

    const showSuccess = () => {
        return (
            <div
                className="alert alert-info"
                style={{ display: success ? '' : 'none' }}
            >
                New account created successfully, please{' '}
                <Link to="/signin">Sign in</Link>
            </div>
        );
    };

    return (
        <Layout
            title="Sign Up"
            description="Sign up to app"
            className="container col-md-8 offset-md-2"
        >
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    );
};

export default Signup;
