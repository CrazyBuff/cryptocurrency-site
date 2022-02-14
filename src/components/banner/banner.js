import React, { useState, useEffect } from 'react';

const backgroundStyle = {
    backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/c/c8/Very_Black_screen.jpg")',
    backgroundColor: 'white',
    filter: 'blur(8px)',
    '-webkit-filter': 'blur(8px)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100%'
}

export default function Banner(props) {
    const [divStyle, setDivStyle] = useState({});

    const handleClick = () => {
        setDivStyle({animation: 'transitionOut 1s'})
    }

    useEffect(() => {
        window.addEventListener("click", handleClick)

        return () => {
            window.removeEventListener("click", handleClick)
        }
    }, [])

    return (
    <>
        <div style={divStyle} onClick={handleClick}>
        <div style={backgroundStyle}></div>
        <div className="text">
            <h1>Crypto Sandbox</h1>
            <p style={{animation: 'glow 1s ease-in-out infinite alternate'}}>click to continue</p>
        </div>
        </div>
    </>
    )
}