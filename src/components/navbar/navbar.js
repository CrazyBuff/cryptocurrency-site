import React from 'react';
import { Link } from 'react-router-dom';

const linkStyle = {
    fontSize: 30, 
    textDecoration: 'none', 
    fontWeight: 'bold',
    color: 'black',
}

export default function Navbar() {


    return (
        <>
        <div className="NavbarItems">
            <h1 className="navbar-logo">Crypto Sandbox</h1>
            <div className="nav-options">
                <div className='sandbox-nav'>
                <Link to="/sandbox" style={linkStyle}><div>To Sandbox <i class="arrows rights"></i></div></Link>
                </div>
            </div>
        </div>
        </>
    )
}