/**
 * THIS IS THE SERVER ROUTE TO HIT -- MUST BE CHANGED WHEN DEPLOYING
 */
const API = 'http://localhost:8080/api';

// the user data comes from the submit, so it automatically contains all the props wrapped in an object that we can stringify
export const signup = user => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const signin = user => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
        });
};

/**
 * AUTHENTICATE METHOD -- GETS REFERNCED BY THE LOGIN COMPONENT
 * sets a JSON Web Token in the cookies of the user
 * data is received
 */

export const authenticate = (data, next) => {
    // checks to make sure the window object is present -- this should not run on the backend
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        return next();
    }
};

export const signout = next => {
    // Removes JWT token from localStorage
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/signout`, {
            method: 'GET'
        })
            .then(response => {
                console.log('signout', response);
            })
            .catch(error => {
                console.log(error);
            });
    }
};

// Runs as a middleware on the Front-End to determine whether the user has already logged in -- checks to see if they have a JWT in their local storage (which would get stored during login)
export const isAuthenticated = () => {
    // if no window, then this func does nothing
    if (typeof window === 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        // return our parsed JWT
        return JSON.parse(localStorage.getItem('jwt'));
    }
    // otherwise the user must not be logged in yet, so return false
    return false;
};
