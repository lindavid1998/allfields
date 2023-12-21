import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import Avatar from '../Avatar';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../../firebase.js';
import { PathContext } from '../../utils';

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

const StyledH1 = styled.h1`
	margin-right: auto;
	color: var(--main-text-color);
	cursor: pointer;
`;

const StyledLink = styled(Link)`
	margin-right: auto;
`;

const Navbar = () => {
	const [user, setUser] = useState(null);
	const location = useLocation()
	const { redirectPath, setRedirectPath } = useContext(PathContext);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setUser(user);
		});

		return () => unsubscribe();
	}, []);

	return (
		<Wrapper>
			<StyledLink to='/'>
				<StyledH1>AllFields</StyledH1>
			</StyledLink>
			<Button text='Try AllFields+ for free' color='bright' size='small' />
			{user ? (
				<Avatar />
			) : (
				<Link to='/sign-in'>
						<Button text='Log in' color='light' size='small' onClick={() => setRedirectPath(location.pathname)} />
				</Link>
			)}
		</Wrapper>
	);
};

export default Navbar;
