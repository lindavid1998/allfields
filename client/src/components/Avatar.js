import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { PathContext } from '../utils.js';
import { auth } from '../firebase.js';
import { signOut } from 'firebase/auth';
import avatarImg from '../assets/soccer-ball.png';

const Wrapper = styled.div`
	border-radius: 50%;
	height: 40px;
	width: 40px;
	background-image: url(${avatarImg});
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	cursor: pointer;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	z-index: 999;
`;

const StyledDropdown = styled.div`
	width: 140px;
	background-color: var(--main-bg-color);
	position: absolute;
	top: 40px;
`;

const Tab = styled.p`
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
	const { setRedirectPath } = useContext(PathContext);

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
		<StyledDropdown>
			<Tab>Profile</Tab>
			<Tab>Settings</Tab>
			<Tab onClick={logOut}>Logout</Tab>
		</StyledDropdown>
	);
};

const Avatar = () => {
	const wrapperRef = useRef(null);
	const [showDropdown, setShowDropdown] = useState(false);

	const toggleDropdown = (e) => {
		if (e.target === wrapperRef.current) {
			setShowDropdown((prevState) => !prevState);
		}
	};

	return (
		<div>
			<Wrapper ref={wrapperRef} onClick={toggleDropdown}>
				{showDropdown ? <Dropdown></Dropdown> : null}
			</Wrapper>
		</div>
	);
};

export default Avatar;
