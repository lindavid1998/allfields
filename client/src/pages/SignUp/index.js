import React from 'react';
import styled from 'styled-components';
import { SignUpForm } from '../../components/Form/Form';
import backgroundImage from '../../assets/pexels-tembela-bohle-1884574.jpg';

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

const SignUp = () => {
	return (
		<Content>
			<SignUpForm />
		</Content>
	);
};

export default SignUp;
