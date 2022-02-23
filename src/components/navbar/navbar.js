import React from 'react';
import { Link } from 'react-router-dom';

const linkStyle = {
    fontSize: 30, 
    textDecoration: 'none', 
    fontWeight: 'bold',
    color: 'black',
}

export default function Navbar(props) {
    const {navLink, inLinkHTML} = props;

    return (
        <>
        <div className="NavbarItems">
            <h1 className="navbar-logo">Crypto Sandbox</h1>
            <div className="nav-options">
                <div className='sandbox-nav'>
                <Link to={navLink} style={linkStyle}>{inLinkHTML}</Link>
                </div>
            </div>
        </div>
        </>
    )
}