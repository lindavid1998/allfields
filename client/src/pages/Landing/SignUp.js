import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import imgSrc from '../../assets/football-fans.webp';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
	display: flex;
	padding: var(--home-padding);
	width: 100%;
	justify-content: center;
	gap: 50px;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	& > :last-child {
		margin-top: 2rem;
	}
`;

const Img = styled.img`
	width: 500px;
	max-height: 300px;
	object-fit: cover;
	border-radius: 5%;
`;

const SignUp = ({ user }) => {
	return (
		<Wrapper>
			<Img src={imgSrc} />
			<Content>
				<h4>Football has no boundaries</h4>
				<h6>
					{user
						? 'Welcome to the largest community in the world'
						: 'Join the largest community in the world today'}
				</h6>
				<div>
					{user ? (
						<Link to='/fields'>
							<Button text='Find fields' className='md-btn' />
						</Link>
					) : (
						<Link to='/sign-up'>
							<Button text='Sign up' className='md-btn' />
						</Link>
					)}
				</div>
			</Content>
		</Wrapper>
	);
};

export default SignUp;
