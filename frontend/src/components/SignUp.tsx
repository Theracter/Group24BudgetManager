import React, { useState } from 'react';
import './SignUp.css'

function SignUp() {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSetFirstName(e: any): void {
        setFirstName(e.target.value);
    }

    function handleSetLastName(e: any): void {
        setLastName(e.target.value);
    }

    function handleSetEmail(e: any): void {
        setEmail(e.target.value);
    }

    function handleSetUsername(e: any): void {
        setUsername(e.target.value);
    }

    function handleSetPassword(e: any): void {
        setPassword(e.target.value);
    }

    return (
        <div id="signUpDiv">
            <input type="text" id="signUpFirstName" placeholder="First Name"
                onChange={handleSetFirstName} /> <br />
            <input type="text" id="signUpLastName" placeholder="Last Name"
                onChange={handleSetLastName} /> <br />
            <input type="text" id="signUpEmail" placeholder="Email"
                onChange={handleSetEmail} /> <br />
            <input type="text" id="signUpUsername" placeholder="Username"
                onChange={handleSetUsername} /> <br />
            <input type="text" id="signUpPasswlrd" placeholder="Password"
                onChange={handleSetPassword} /> <br />
            <button type="button" id="signUpButton">Sign Up</button>
        </div>
    );
};
export default SignUp;