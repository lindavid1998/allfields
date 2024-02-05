import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { get, ref } from 'firebase/database';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { addUser, auth, db, provider } from '../firebase.js';
import {
	email_validation,
	password_validation,
} from '../utils/inputValidation.js';
import Button from './Button.js';
import './Form.css';
import Input from './Input.js';

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

export const SignInForm = () => {
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const methods = useForm();

	const onSubmit = (data, e) => {
		e.preventDefault()
		const email = data.email;
		const password = data.password;
		signIn(email, password)
	};

	const signIn = async (email, password) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate('/auth-status');
		} catch (error) {
			setError(error.message);
		}
	};

	const signInWithGoogle = async () => {
		try {
			const userCredential = await signInWithPopup(auth, provider);
			const user = userCredential.user;
			const { uid, email } = user;
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
		<FormProvider {...methods}>
			<form
				noValidate
				onSubmit={methods.handleSubmit(onSubmit)}
				className='auth-form'
			>
				<h2>Welcome back!</h2>

				<Input {...email_validation} className='form-row' />
				<Input {...password_validation} className='form-row' />

				{error ? <p className='error'>{error}</p> : null}

				<Button
					className='md-btn stretched-btn'
					text='Log in'
					type='submit'
				/>

				<Button
					className='md-btn stretched-btn white-btn'
					text='Forgot your password?'
				/>

				<Button
					className='md-btn stretched-btn blue-btn'
					text='Continue with Google'
					type='button'
					onClick={signInWithGoogle}
				/>

				<p>
					Don't have an account?
					<StyledLink to='/sign-up'>Sign up for free</StyledLink>
				</p>
			</form>
		</FormProvider>
	);
};
