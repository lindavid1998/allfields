import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import Button from './Button.js';
import Avatar from './Avatar.js';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase.js';
import { PathContext } from '../utils.js';

const Wrapper = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 64px;
	width: 100%;
	max-width: var(--max-width);
	padding: 0 16px;
	gap: 25px;
`;

const Logo = styled.h4`
	margin-right: auto;
	color: var(--main-text-color);
	cursor: pointer;
`;

const StyledLink = styled(Link)`
	margin-right: auto;
`;

const Navbar = () => {
	const [user, setUser] = useState(null);
	const location = useLocation();
	const { setRedirectPath } = useContext(PathContext);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setUser(user);
		});

		return () => unsubscribe();
	}, []);

	return (
		<Wrapper>
			<StyledLink to='/'>
				<Logo>AllFields</Logo>
			</StyledLink>

			<Button text='Try AllFields+ for free' className='bright-btn sm-btn' />

			{user ? (
				<Avatar />
			) : (
				<Link to='/sign-in'>
					<Button
						className='sm-btn light-btn'
						text='Log in'
						onClick={() => setRedirectPath(location.pathname)}
					/>
				</Link>
			)}
		</Wrapper>
	);
};

export default Navbar;
