import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import TextInput from './TextInput';
import { Link } from 'react-router-dom';
import { auth, provider } from '../../firebase.js';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

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
	color: var(--main-text-color);
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
	// const [firstName, setFirstName] = useState('');
	// const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const SignUp = async () => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			navigate('/auth-status');
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<Content>
			<StyledH1>Create your free account</StyledH1>
			{/* <TextInput
				name='firstName'
				label='First name'
				type='text'
				placeholder='First name'
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
			/>
			<TextInput
				name='lastName'
				label='Last name'
				type='text'
				placeholder='Last name'
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
			/> */}
			<TextInput
				name='email'
				label='Email'
				type='email'
				placeholder='Email address'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<TextInput
				name='password'
				label='Password'
				type='password'
				placeholder='Password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			{error ? <p>{error}</p> : null}
			<Button size='medium' text='Sign up' stretched='true' onClick={SignUp} />
			<StyledP>
				Already have an account? <StyledLink to='/sign-in'>Log in</StyledLink>
			</StyledP>
			<TOS>
				By continuing to use AllFields, you agree to our Terms of Service and
				Privacy Policy.
			</TOS>
		</Content>
	);
};

export const SignInForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const SignIn = async () => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			navigate('/auth-status');
		} catch (error) {
			setError(error.message);
		}
	};

	const SignInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, provider);
			navigate('/auth-status');
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<Content>
			<StyledH1>Welcome back!</StyledH1>
			<TextInput
				name='email'
				label='Email'
				type='email'
				placeholder='Email address'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<TextInput
				name='password'
				label='Password'
				type='password'
				placeholder='Password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			{error ? <p>{error}</p> : null}
			<Button size='medium' text='Log in' stretched='true' onClick={SignIn} />
			<Button
				size='medium'
				text='Forgot your password?'
				color='white'
				stretched='true'
			/>
			<Button
				size='medium'
				text='Continue with Google'
				color='blue'
				stretched='true'
				onClick={SignInWithGoogle}
			/>
			<StyledP>
				Don't have an account?
				<StyledLink to='/sign-up'>Sign up for free</StyledLink>
			</StyledP>
		</Content>
	);
};
