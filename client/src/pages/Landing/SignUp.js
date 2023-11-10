import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import imgSrc from '../../assets/football-fans.webp';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
	display: flex;
	padding: var(--home-padding);
	width: 100%;
`;

const Content = styled.div`
	display: flex;
	margin: 0 auto;
	width: 100%;
	max-width: var(--max-width);
	justify-content: space-between;
	gap: 25px;
`;

const Text = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	align-items: start;
`;

const MainText = styled.div`
	font-weight: bold;
	font-size: 1.4rem;
`;

const Subtext = styled.div`
	margin-bottom: 15px;
	font-size: 1.2rem;
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
			<Content>
				<Img src={imgSrc} />
				<Text>
					<MainText>Football has no boundaries</MainText>

					<Subtext>
						{user
							? 'Welcome to the largest community in the world'
							: 'Join the largest community in the world today'}
					</Subtext>

					{user ? (
						<Link to='/fields'>
							<Button text='Find fields' color='primary' size='medium' />
						</Link>
					) : (
						<Link to='/sign-up'>
							<Button text='Sign up' color='primary' size='medium' />
						</Link>
					)}
				</Text>
			</Content>
		</Wrapper>
	);
};

export default SignUp;
