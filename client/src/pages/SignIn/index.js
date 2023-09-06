import React from 'react'
import styled from 'styled-components';
import { SignInForm } from '../../components/Form/Form';
import backgroundImage from '../../assets/pexels-stanley-morales-3148452.jpg';

const Content = styled.div`
	width: 100%;
	height: 100vh;
	background-image: url(${backgroundImage});
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 50px;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`;

const Login = () => {
  return (
		<Content>
			<SignInForm />
		</Content>
	);
}

export default Login