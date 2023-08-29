import React from 'react';
import { StyledButton } from './styles';

const Button = ({ size, color, text, stretched }) => {
	return (
		<StyledButton size={size} color={color} stretched={stretched}>
			{text}
		</StyledButton>
	);
};

export default Button;
