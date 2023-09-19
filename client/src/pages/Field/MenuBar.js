import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import { auth, getUserId } from '../../firebase';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 30px;
`;

const Tab = styled.button`
	background: transparent;
	border: 2px solid transparent;
	font-size: 1rem;
	color: var(--main-text-color);
	padding: 3px;
	transition: 0.2s all;
	cursor: pointer;
	&:hover {
		border-bottom: 2px solid var(--gray-text-color);
	}
`;

const MenuBar = ({ handleVisibility }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		let userId = getUserId(auth);
		if (!userId) {
			navigate('/sign-in');
		} else {
			handleVisibility();
		}
	};

	return (
		<Wrapper>
			<Tab>Posts</Tab>
			<Tab>Calendar</Tab>
			<Tab>Directions</Tab>
			<Button text='Write post' size='small' onClick={handleClick} />
		</Wrapper>
	);
};

export default MenuBar;