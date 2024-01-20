import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { addUser, auth } from '../firebase.js';
import {
	email_validation,
	first_name_validation,
	last_name_validation,
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

export const SignUpForm = () => {
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const methods = useForm();

	const onSubmit = methods.handleSubmit((data) => {
		signUserUp(data.firstName, data.lastName, data.email, data.password);
		methods.reset(); // reset the form
	});

	const signUserUp = async (firstName, lastName, email, password) => {
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
		<FormProvider {...methods}>
			<form
				noValidate
				onSubmit={(e) => e.preventDefault()}
				className='auth-form'
			>
				<h2>Create your free account</h2>

				<Input {...first_name_validation} className='form-row' />
				<Input {...last_name_validation} className='form-row' />
				<Input {...email_validation} className='form-row' />
				<Input {...password_validation} className='form-row' />

				{error ? <p className='error'>{error}</p> : null}

				<Button
					className='md-btn stretched-btn'
					text='Sign up'
					onClick={onSubmit}
				/>

				<p>
					Already have an account? <StyledLink to='/sign-in'>Log in</StyledLink>
				</p>

				<p className='small'>
					By continuing to use AllFields, you agree to our Terms of Service and
					Privacy Policy.
				</p>
			</form>
		</FormProvider>
	);
};
