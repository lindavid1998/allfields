import React from 'react';
import styled from 'styled-components';
import avatarImg from '../assets/soccer-ball.png';

const Div = styled.div`
	border-radius: 50%;
	background-image: url(${avatarImg});
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	z-index: 999;
`;

const Avatar = ({ onClick, className }) => {
	return <Div onClick={onClick} className={className ? `avatar ${className}` : 'avatar'} />;
};

export default Avatar;
