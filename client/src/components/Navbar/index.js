import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import Avatar from '../Avatar';
import { Link } from 'react-router-dom';

const Wrapper = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
  height: 64px;
	width: 100%;
	max-width: var(--max-width);
  padding: 0 16px;
  gap: 10px;
`;

const StyledH1 = styled.h1`
  margin-right: auto;
	color: var(--main-text-color);
	cursor: pointer;
`

const StyledLink = styled(Link)`
	margin-right: auto;
`

const Navbar = () => {
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
			<Link to='/login'>
				<Button text='Log in' color='light' size='small'></Button>
			</Link>
			{/* <Avatar></Avatar> */}
		</Wrapper>
	);
};

export default Navbar;
