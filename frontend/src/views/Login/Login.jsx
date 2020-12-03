import React, { useState } from 'react';
import { login, signup } from '../../data.ts';
import './Login.scss';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <input className="form-control" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input className="form-control" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="button-container">
                <button className="btn btn-primary" onClick={() => login({ username, password })}>Login</button>
                <button className="btn btn-secondary" onClick={() => signup({ username, password })}>Signup</button>
            </div>
        </>
    )
}

export default Login;