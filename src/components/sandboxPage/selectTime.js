import React, { useState, useEffect } from "react";
import Button from "../button";

const buttonOne = {

}

const buttonTwo = {

}

const buttonThree = {

}

export default function SelectTime(props) {
    const {handleClick} = props
    const [selected, setSelected] = useState()

    const handleButtonClick = (target) => {
        handleClick(target);
        if (target === 1) {
            setSelected(1);
        } else if (target === 30) {
            setSelected(30) 
        } else {

        }
    }

    useEffect(() => {
        if (selected === 1) {
            
        }
    }, [selected])

    return (
        <div className="buttons-container">
            <button style={buttonOne} className='select-time-button' onClick={() => handleButtonClick(1)}>1D</button>
            <button stlye={buttonTwo} className='select-time-button' onClick={() => handleButtonClick(30)}>1M</button>
            <button style={buttonThree} className='select-time-button' onClick={() => handleButtonClick(90)}>3M</button>
        </div>
    )
}