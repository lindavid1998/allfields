import styled from 'styled-components';

const SIZES = {
	small: { fontSize: '13px', height: '32px', padding: '0 16px' },
	medium: { fontSize: '16px', height: '48px', padding: '0 24px' },
	large: { fontSize: '20px', height: '48px', padding: '0 24px' },
};

const COLORS = {
	primary: {
		borderColor: '--main-btn-color',
		bgColor: '--main-btn-color',
		textColor: '--main-bg-color',
	},
	bright: {
		borderColor: '--bright-btn-color',
		bgColor: '--bright-btn-color',
		textColor: '--main-text-color',
	},
	light: {
		borderColor: '--light-btn-color',
		bgColor: '--light-btn-color',
		textColor: '--main-text-color',
	},
	blue: {
		bgColor: '--blue-btn-color',
		borderColor: '--blue-btn-color',
		textColor: '--main-bg-color',
	},
	white: {
		borderColor: '--main-bg-color',
		bgColor: '--main-bg-color',
		textColor: '--main-text-color',
	},
};

const getSizeStyles = (size) => {
	const { fontSize, height, padding } = SIZES[size] || SIZES.small;
	return `
    font-size: ${fontSize};
    height: ${height};
    padding: ${padding};
  `;
};

const getColorStyles = (color) => {
	const { borderColor, bgColor, textColor } = COLORS[color] || COLORS.primary;
	return `
    border-color: var(${borderColor});
    background-color: var(${bgColor});
    color: var(${textColor});
  `;
};

export const StyledButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: ${(props) => (props.$bold ? '700' : 'normal')};
	line-height: 1.5;
	border: 2px solid transparent;
	cursor: pointer;
	transition: all 0.2s ease-out;
	border-radius: 9999px;
	width: ${(props) => (props.stretched ? '100%' : 'fit-content')};
	${(props) => getSizeStyles(props.size)}
	${(props) => getColorStyles(props.color)}
  &:hover {
		filter: brightness(85%);
	}
`;
