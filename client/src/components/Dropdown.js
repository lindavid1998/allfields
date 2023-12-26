import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { PathContext } from '../utils.js';
import { auth, getUserId } from '../firebase.js';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

const StyledDropdown = styled.div`
	width: 140px;
	background-color: var(--main-bg-color);
	position: absolute;
	top: 50px;
	right: 0;
	z-index: 999;
`;

const Tab = styled.p`
	margin: 0;
	border-radius: 5px;
	transition: 0.2s all;
	width: 100%;
	padding: 10px;
  cursor: pointer;
	&:hover {
		background-color: var(--light-bg-color);
	}
`;

const Dropdown = ({ hideDropdown }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { setRedirectPath } = useContext(PathContext);
	const uid = getUserId(auth);

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
			<Tab onClick={hideDropdown}>
				<Link
					to={`users/${uid}`}
					style={{ display: 'block', color: 'inherit', width: '100%' }}
				>
					Profile
				</Link>
			</Tab>
			<Tab onClick={hideDropdown}>Settings</Tab>
      <Tab onClick={() => {
        logOut()
        hideDropdown()
      }}>Logout</Tab>
		</StyledDropdown>
	);
};

export default Dropdown;