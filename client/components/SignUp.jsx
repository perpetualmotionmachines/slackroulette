import React, { useState } from 'react';

const SignUp = () => {
    // declare state variables using hooks/useState
    const [inputs, setInputs] = useState({
        email: '',
        username: '',
        password: ''
    });

    // f(x) for post request to save user info
    const handleSubmission = () => {
        const body = {
            email: inputs.email,
            username: inputs.username,
            password: inputs.password
        };
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(body)
        });
    };

    const { email, username, password } = inputs;

    return (
        <main className="signUpContainer">
            <section className="signUpInfo">
                <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={e => setInputs({ email: e.target.value })}
                    />
                </label>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={e => setInputs({ username: e.target.value })}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={e => setInputs({ password: e.target.value })}
                    />
                </label>
            </section>
            <button
                type="submit"
                onClick={() => {
                    handleSubmission();
                }}
            >
                Sign Up
            </button>
        </main>
    );
};

export default SignUp;
