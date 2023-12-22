import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button.js';
import TextInput from './TextInput.js';
import { Link } from 'react-router-dom';
import { auth, provider, db, addUser } from '../firebase.js';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';

const Form = styled.form`
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
		margin: 0 auto;
	}
	> h2,
	p {
		text-align: center;
	}
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

export const SignUpForm = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
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
			const userId = userCredential.user.uid;
			addUser(userId, firstName, lastName, email);
			navigate('/auth-status');
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<Form>
			<h2>Create your free account</h2>

			<TextInput
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
			/>

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

			<Button
				className='md-btn stretched-btn'
				text='Sign up'
				onClick={SignUp}
			/>

			<p>
				Already have an account? <StyledLink to='/sign-in'>Log in</StyledLink>
			</p>

			<p className='small'>
				By continuing to use AllFields, you agree to our Terms of Service and
				Privacy Policy.
			</p>
		</Form>
	);
};

export const SignInForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const SignIn = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate('/auth-status');
		} catch (error) {
			setError(error.message);
		}
	};

	const SignInWithGoogle = async () => {
		try {
			const userCredential = await signInWithPopup(auth, provider);
			const user = userCredential.user;
			const { uid, email } = user
			const [firstName, lastName] = user.displayName.split(' ');

			// reference uid subtree in db
			const userDbRef = ref(db, 'users/' + uid);
			const snapshot = await get(userDbRef);

			// if uid subtree does not exist in db, add it
			if (!snapshot.exists()) {
				addUser(uid, firstName, lastName, email);
			}

			navigate('/auth-status');
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<Form>
			<h2>Welcome back!</h2>

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

			<Button className='md-btn stretched-btn' text='Log in' onClick={SignIn} />

			<Button
				className='md-btn stretched-btn white-btn'
				text='Forgot your password?'
			/>

			<Button
				className='md-btn stretched-btn blue-btn'
				text='Continue with Google'
				onClick={SignInWithGoogle}
			/>

			<p>
				Don't have an account?
				<StyledLink to='/sign-up'>Sign up for free</StyledLink>
			</p>
		</Form>
	);
};
