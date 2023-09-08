import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import Avatar from '../Avatar';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase.js';

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
			<Button
				text='Try AllFields+ for free'
				color='bright'
				size='small'
			></Button>
			{user ? (
				<Avatar />
			) : (
				<Link to='/sign-in'>
					<Button text='Log in' color='light' size='small' />
				</Link>
			)}
		</Wrapper>
	);
};

export default Navbar;
