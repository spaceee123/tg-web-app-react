import React from 'react';
import './Buttons.css'

const Button = (props) => {
    return (
        <button {...props} className={'button '+props.className}/>
    );
};

export default Button;