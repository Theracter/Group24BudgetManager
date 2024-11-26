import React, { useState } from 'react';
import './SignUp.css'

function SignUp() {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSetFirstName(e: any): void {
        setFirstName(e.target.value);
    }

    function handleSetLastName(e: any): void {
        setLastName(e.target.value);
    }

    function handleSetUsername(e: any): void {
        setUsername(e.target.value);
    }

    function handleSetPassword(e: any): void {
        setPassword(e.target.value);
    }

    async function doSignUp(event:any) : Promise<void>
    {
	event.preventDefault();

	var obj = {login:username, password:password, firstName: firstName, lastName: lastName};
	var js = JSON.stringify(obj);
	console.log(js);
	try
	{
	const response = await fetch('https://budgetmanager.xyz/api/signUp',
	{method:'POST',body:js,headers:{'Content-Type':'application/json'}});
	console.log(response);
	var res = JSON.parse(await response.text());
	console.log(res);
	if( res.id <= 0 )
	{
		setMessage('Error making a new account');
	}
	else
	{
		var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
		localStorage.setItem('user_data', JSON.stringify(user));
		
		window.location.href = '/main-menu';
	
	}
}
	catch(error:any)
	{
	alert(error.toString());
	return;
	}
};

    return (
        <div id="signUpDiv">
            <input type="text" id="signUpFirstName" placeholder="First Name"
                onChange={handleSetFirstName} /> <br />
            <input type="text" id="signUpLastName" placeholder="Last Name"
                onChange={handleSetLastName} /> <br />
            <input type="text" id="signUpUsername" placeholder="Username"
                onChange={handleSetUsername} /> <br />
            <input type="text" id="signUpPasswlrd" placeholder="Password"
                onChange={handleSetPassword} /> <br />
            <button type="button" id="signUpButton">Sign Up</button>
        </div>
    );
};
export default SignUp;