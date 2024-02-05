import React from 'react';
import './Button.css';

const Button = ({ onClick = () => { }, text, className, type='button' }) => {
	return (
		<button type={type} onClick={(e) => onClick(e)} className={className}>
			{text}
		</button>
	);
};

export default Button;
