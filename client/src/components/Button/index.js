import React from 'react';
import { StyledButton } from './styles';

const Button = ({ size, color, text }) => {
	return (
		<StyledButton size={size} color={color}>
			{text}
		</StyledButton>
	);
};

export default Button;
