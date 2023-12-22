import React from 'react'
import styled from 'styled-components';

const StyledTab = styled.div`
	background: transparent;
	border: 2px solid transparent;
	color: var(--main-text-color);
	padding: 3px;
	transition: 0.2s all;
	cursor: pointer;
	&:hover {
		border-bottom: 2px solid var(--gray-text-color);
	}
	&:first-child {
		font-weight: bold;
		border-bottom: 2px solid var(--gray-text-color);
	}
`;

const Tab = ({ text }) => {
  return <StyledTab>{text}</StyledTab>;
}

export default Tab