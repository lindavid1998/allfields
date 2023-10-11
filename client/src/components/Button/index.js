import React from 'react';
import { StyledButton } from './styles';

const Button = ({ size, color, text, stretched, onClick, bold = true}) => {
	return (
		<StyledButton
			size={size}
			color={color}
			stretched={stretched}
			$bold={bold}
			type='button'
			onClick={onClick}
		>
			{text}
		</StyledButton>
	);
};

export default Button;
