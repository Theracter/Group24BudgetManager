import React, { useState } from 'react';
import './Login.css';
import MainMenuPage from '../pages/MainMenuPage.tsx';
function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSetUsername(e: any): void {
        setUsername(e.target.value);
    }

    function handleSetPassword(e: any): void {
        setPassword(e.target.value);
    }

    async function doLogin(event:any) : Promise<void>
    {
	event.preventDefault();

	var obj = {login:username,password:password};
	var js = JSON.stringify(obj);
	console.log(js);
	try
	{
	const response = await fetch('https://budgetmanager.xyz/api/login',
	{method:'POST',body:js,headers:{'Content-Type':'application/json'}});
	console.log(response);
	var res = JSON.parse(await response.text());
	console.log(res);
	if( res.id <= 0 )
	{
		setMessage('User/Password combination incorrect');
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