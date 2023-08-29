import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import TextInput from '../../components/Form/TextInput';

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

const StyledA = styled.a`
	margin: 0 4px;
	&:hover {
		color: var(--gray-text-color);
	}
	&:visited {
		color: inherit;
	}
`;

const TOS = styled.p`
	font-size: 0.8rem;
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
			<Button size='medium' text='Sign up' type='submit' />
			<StyledP>
				Already have an account?<StyledA href=''>Log in</StyledA>
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
			<Button size='medium' text='Log in' type='submit'></Button>
			<Button size='medium' text='Forgot your password?' color='light'></Button>
			<StyledP>
				Don't have an account?<StyledA href=''>Sign up for free</StyledA>
			</StyledP>
		</Content>
	);
};