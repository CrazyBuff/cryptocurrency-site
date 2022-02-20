import React from 'react';

export default function Button(props) {
    const { btnStyle, spanStyle, parentFunction, displayText, value } = props;
    
    return (
        <>
        <button type="button" style={btnStyle} onClick={() => parentFunction(value)}>
            <span style={spanStyle}>
            {displayText}
            </span>
        </button>
        </>
    )
}