import React, { useContext } from 'react';
import styled from 'styled-components';
import { auth } from '../../firebase.js';
import { signOut } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { PathContext } from '../../utils';

const Wrapper = styled.div`
	width: 140px;
	background-color: var(--main-bg-color);
`;

const Div = styled.p`
	margin: 0;
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
	const location = useLocation();
	const { redirectPath, setRedirectPath } = useContext(PathContext);

	const logOut = async () => {
		try {
			await signOut(auth);
			setRedirectPath(location.pathname);
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
