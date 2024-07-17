import React from "react";
import PropTypes from 'prop-types';


const ButtonAction = ({ label, color = 'bg-green-500', onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`middle none center mr-1 rounded-lg ${color} p-2 font-sans text-xs font-bold uppercase 
            text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg 
            hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] 
            active:shadow-none disabled:pointer-events-none disabled:opacity-50 
            disabled:shadow-none`}>
            {label}
        </button>
    )
};

ButtonAction.propTypes = {
    label: PropTypes.string.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

export default ButtonAction;