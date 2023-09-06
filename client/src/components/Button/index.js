import React from 'react';
import { StyledButton } from './styles';

const Button = ({ size, color, text, stretched, onClick }) => {
	return (
		<StyledButton
			size={size}
			color={color}
			stretched={stretched}
			type='button'
			onClick={onClick}
		>
			{text}
		</StyledButton>
	);
};

export default Button;
