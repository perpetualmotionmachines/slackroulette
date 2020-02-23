import React, { useState } from 'react';

const SignUp = () => {
    // declare state variables using hooks/useState
    const [inputs, setInputs] = useState({
        email: '',
        username: '',
        password: ''
    });

    // f(x) for post request to save user info
    const handleSubmission = async () => {
        const body = {
            username: inputs.username,
            email: inputs.email,
            password: inputs.password
        };
        console.log('in handle subs');
        console.log('body: ', body);
        await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log('yikes'));
        console.log('fetch done');
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
                        onChange={e =>
                            setInputs({
                                ...inputs,
                                email: e.target.value
                            })
                        }
                    />
                </label>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={e =>
                            setInputs({
                                ...inputs,
                                username: e.target.value
                            })
                        }
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={e =>
                            setInputs({
                                ...inputs,
                                password: e.target.value
                            })
                        }
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
