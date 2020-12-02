import React, { useState, useEffect } from 'react';
import { login, signup } from '../../data';
import './Login.scss';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <input className="form-control" type="text" value={username} onChange={(e) => setUsername(e)} />
            <input className="form-control" type="text" value={password} onChange={(e) => setPassword(e)} />
            <div className="button-container">
                <button class="btn btn-primary" onClick={() => login({ username, password })}>Login</button>
                <button class="btn btn-secondary" onClick={() => signup({ username, password })}>Signup</button>
            </div>
        </>
    )
}

export default Login;