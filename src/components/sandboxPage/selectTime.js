import React from "react";



export default function SelectTime(props) {
    const {handleClick} = props

    const handleButtonClick = (target) => {
        handleClick(target);
    }

    return (
        <div className="buttons-container">
            <button className='select-time-button' onClick={() => handleButtonClick(1)}>1D</button>
            <button className='select-time-button' onClick={() => handleButtonClick(30)}>1M</button>
            <button className='select-time-button' onClick={() => handleButtonClick(90)}>3M</button>
        </div>
    )
}