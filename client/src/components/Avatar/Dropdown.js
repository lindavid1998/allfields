import React from 'react';
import styled from 'styled-components';
import { auth } from '../../firebase.js';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
	width: 140px;
	background-color: var(--main-bg-color);
`;

const Div = styled.div`
	font-size: 0.9rem;
	border-radius: 5px;
	transition: 0.2s all;
	width: 100%;
	padding: 10px;
	&:hover {
		background-color: var(--light-bg-color);
	}
`;

const Dropdown = () => {
	const navigate = useNavigate();

	const logOut = async () => {
		try {
			await signOut(auth);
			navigate('/auth-status');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Wrapper>
			<Div>Profile</Div>
			<Div>Settings</Div>
			<Div onClick={logOut}>Logout</Div>
		</Wrapper>
	);
};

export default Dropdown;
