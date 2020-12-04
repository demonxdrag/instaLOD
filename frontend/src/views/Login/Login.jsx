import React, { useState } from 'react';
import { login, signup } from '../../data.ts';
import { withRouter } from 'react-router-dom';
import './Login.scss';

/**
 * Component that interacts with an existing file
 * @param {Object} props inherited for routing purposes
 */
const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);

    /**
     * Function that checks login
     * @param {Object} credentials { username, password } 
     */
    const loginHandler = async ({ username, password }) => {
        try {
            let success = await login({ username, password });
            if (success) {
                localStorage.setItem('jwt', 'This should be a jwt')
                localStorage.setItem('username', username)
                props.history.push('/');
            } else {
                throw new Error('Username or password not found');
            }
        } catch (err) {
            console.error(err);
            setErrorMsg(err.message);
        }
    }

    /**
     * Function that signups a user
     * @param {Object} credentials { username, password } 
     */
    const signupHandler = async ({ username, password }) => {
        try {
            let success = await signup({ username, password });
            if (success) {
                localStorage.setItem('jwt', 'This should be a jwt')
                localStorage.setItem('username', username)
                props.history.push('/');
            } else {
                throw new Error('Username or password not found');
            }
        } catch (err) {
            console.error(err);
            setErrorMsg(err.message);
        }
    }

    return (
        <div className="Login">
            <div className="login-container">
                <h2>Login/Signup</h2>
                <input className="form-control" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className="form-control" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="button-container">
                    <button className="btn btn-primary" onClick={() => loginHandler({ username, password })}>Login</button>
                    <button className="btn btn-secondary" onClick={() => signupHandler({ username, password })}>Signup</button>
                    <div className="error-message">{errorMsg}</div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login);