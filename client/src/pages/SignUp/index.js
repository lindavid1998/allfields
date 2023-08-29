import React from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
// import Form from './Form';
import { SignUpForm } from '../../components/Form/Form';
import backgroundImage from '../../assets/pexels-tembela-bohle-1884574.jpg';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
`;

const Content = styled.div`
	width: 100%;
	height: 100%;
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
		<Wrapper>
			<Navbar></Navbar>
			<Content>
				<SignUpForm></SignUpForm>
			</Content>
		</Wrapper>
	);
};

export default SignUp;