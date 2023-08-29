import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import TextInput from '../../components/Form/TextInput';
import { Link } from 'react-router-dom';

const Content = styled.form`
	display: flex;
	flex-direction: column;
	gap: 20px;
	border-radius: 10px;
	padding: 32px 80px;
	width: fit-content;
	align-items: stretch;
	background-color: white;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
	> * {
		align-items: center;
		display: flex;
	}
`;

const StyledH1 = styled.h1`
	margin: 0 auto;
`;

const StyledP = styled.p`
	font-size: 1.1rem;
	margin: 0 auto;
	color: var(--main-text-color);
`;

const StyledLink = styled(Link)`
	margin: 0 4px;
	text-decoration: underline;
	&:hover {
		color: var(--gray-text-color);
	}
	&:visited {
		color: inherit;
	}
`;

const TOS = styled.p`
	font-size: 0.8rem;
	max-width: 450px;
`;

export const SignUpForm = () => {
	return (
		<Content>
			<StyledH1>Create your free account</StyledH1>
			<TextInput
				name='firstName'
				label='First name'
				type='text'
				placeholder='First name'
			/>
			<TextInput
				name='lastName'
				label='Last name'
				type='text'
				placeholder='Last name'
			/>
			<TextInput
				name='email'
				label='Email'
				type='email'
				placeholder='Email address'
			/>
			<TextInput
				name='password'
				label='Password'
				type='password'
				placeholder='Password'
			/>
			<Link to='/signup'>
				<Button size='medium' text='Sign up' type='submit' stretched />
			</Link>
			<StyledP>
				Already have an account? <StyledLink to='/login'>Log in</StyledLink>
			</StyledP>
			<TOS>
				By continuing to use AllFields, you agree to our Terms of Service and
				Privacy Policy.
			</TOS>
		</Content>
	);
};

export const LogInForm = () => {
	return (
		<Content>
			<StyledH1>Welcome back!</StyledH1>
			<TextInput
				name='email'
				label='Email'
				type='email'
				placeholder='Email address'
			/>
			<TextInput
				name='password'
				label='Password'
				type='password'
				placeholder='Password'
			/>
			<Link to='/login'>
				<Button size='medium' text='Log in' type='submit' stretched />
			</Link>
			<Button
				size='medium'
				text='Forgot your password?'
				color='light'
				stretched
			/>
			<StyledP>
				Don't have an account?
				<StyledLink to='/signup'>Sign up for free</StyledLink>
			</StyledP>
		</Content>
	);
};
