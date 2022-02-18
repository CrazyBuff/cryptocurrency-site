import React from 'react';

export default function Button(props) {
    const { style, parentFunction, displayText, value } = props;
    
    return (
        <>
        <button type="button" style={style} onClick={() => parentFunction(value)}>
            {displayText}
        </button>
        </>
    )
}