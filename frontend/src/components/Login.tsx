import React, { useState } from 'react';
import './Login.css'

function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSetUsername(e: any): void {
        setUsername(e.target.value);
    }

    function handleSetPassword(e: any): void {
        setPassword(e.target.value);
    }

    function doLogin(e: any): void {
        e.preventDefault();
        window.location.href = '/main-menu';

    }

    return (
        <div id="loginDiv">
            <input type="text" id="signUpUsername" placeholder="Username"
                onChange={handleSetUsername} /> <br />
            <input type="text" id="signUpPasswlrd" placeholder="Password"
                onChange={handleSetPassword} /> <br />
            <button type="button" id="loginButton" onClick={doLogin}>Login</button>
        </div>
    );
};
export default Login;