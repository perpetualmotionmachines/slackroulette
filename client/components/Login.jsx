import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth/index';

/**
 * This is the Login Screen;
 * It is accessed/routed FROM the ViewRooms component;
 * It should re-route back to viewRooms;
 *
 * This code was implemented by : Lance J -- please reach out w/ questions or modifications
 */

const Login = () => {
    // Hooks format: [value, setterFuncName] = useState('initialVariableValue')
    // we ask for a name, email, password
    const [values, setValues] = useState({
        email: '',
        username: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;

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
            <div className="login-container">
                <form>
                    <h1 className="heading">Login</h1>
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
                        <label className="text-muted">Username</label>
                        <input
                            onChange={handleChange('email')}
                            type="text"
                            className="form-control"
                            value={username}
                        />
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Password</label>
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
            </div>
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
            return <Redirect to="/user/dashboard" />;
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        <div
            title="Sign In"
            description="Sign in to app"
            className="container col-md-8 offset-md-2"
        >
            <h2>Sign In</h2>
            {showLoading()}
            {showError()}
            {signinForm()}
            {redirectUser()}
        </div>
    );
};
export default Login;

// alternative rendering -- will likely delete later
//    <div className="login-container">
// <form className="login-container__form">
// <h1 className="heading">Login</h1>
// <div>
//     <input
//         placeholder="Name"
//         className="joinInput"
//         type="text"
//         onChange={event => setName(event.target.value)}
//     />
// </div>
// <div>
//     <input
//         placeholder="Room"
//         className="joinInput mt-20"
//         type="text"
//         onChange={event => setRoom(event.target.value)}
//     />
// </div>
// <Link
//     onClick={e =>
//         !username || !room ? e.preventDefault() : null
//     }
//     to={`/chat?username=${username}&room=${room}`}
// >
//     <button className="button mt-20" type="submit">
//         Sign In
//     </button>
// </Link>
// </form>
// </div>
