import React, { useState } from 'react';
import { login, signup } from '../../data.ts';
import './Login.scss';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = async ({ username, password }) => {
        try {
            let success = await login({ username, password });
            console.log({success})
            if (success) {
                localStorage.setItem('jwt', success.user_id)
            } else {
                throw new Error('Username or password not found');
            }
        } catch (err) {
            console.error(err)
        }
    }

    const signupHandler = async ({ username, password }) => {
        try {
            let success = await signup({ username, password });
            console.log({success})
            if (success) {
                localStorage.setItem('jwt', success.user_id)
            } else {
                throw new Error('Username or password not found');
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <input className="form-control" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input className="form-control" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="button-container">
                <button className="btn btn-primary" onClick={() => loginHandler({ username, password })}>Login</button>
                <button className="btn btn-secondary" onClick={() => signupHandler({ username, password })}>Signup</button>
            </div>
        </>
    )
}

export default Login;