import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {IoMenuOutline, IoClose } from 'react-icons/io5';
//import { Button } from './Button';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState<boolean>(false);
  const [button, setButton] = useState<boolean>(true);

  const handleClick = () => {
    setClick(!click);
  };

  const closeMobileMenu = () => {
    setClick(false);
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  // Add event listener for window resize in a useEffect
  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);
    return () => window.removeEventListener('resize', showButton);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            BUDGET
          </Link>
          <div onClick={handleClick} className="menu-icon">
            {click ? <IoClose color='white'/> : <IoMenuOutline color='white'/>}
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/info" className="nav-links" onClick={closeMobileMenu}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/sign-up" className="nav-links" onClick={closeMobileMenu}>
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                Login
              </Link>
            </li>
          </ul>
          {/*
           currently redundant due to sign up option in navbar
           {button && <Button buttonStyle="btn--outline">SIGN UP</Button>}
           */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
