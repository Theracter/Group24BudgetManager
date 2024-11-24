import React, { useState } from 'react';
import './Login.css'

function Logout() {
    function doLogout(e: any): void {
        e.preventDefault();
        window.location.href = '/';

    }

    return (
        <div>
            <button type="button" id="loginButton" onClick={doLogout}>Logout</button>
        </div>
    );
};
export default Logout;