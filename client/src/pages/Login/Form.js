import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import TextInput from '../../components/Form/TextInput';

const Content = styled.form`
	display: flex;
	flex-direction: column;
	gap: 20px;
	border: 1px solid black;
	border-radius: 10px;
	padding: 32px 80px;
	width: fit-content;
  align-items: stretch;
`;

const StyledH2 = styled.h1`
	margin: 0 auto;
`;

const StyledP = styled.p`
	font-size: 1.1rem;
	margin: 0 auto;
	color: var(--main-text-color);
`

const StyledA = styled.a`
	&:hover {
		color: var(--gray-text-color);
	}
	&:visited {
		color: inherit;
	}
`

const Form = () => {
	return (
		<Content>
			<StyledH2>Welcome back!</StyledH2>
			<TextInput label='email' type='email' placeholder='Email address' />
			<TextInput label='password' type='password' placeholder='Password' />
			<Button size='medium' text='Log in' type='submit'></Button>
			<Button size='medium' text='Forgot your password?' color='light'></Button>
			<StyledP>
				Don't have an account? <StyledA href=''>Sign up for free</StyledA>
			</StyledP>
		</Content>
	);
};

export default Form;
