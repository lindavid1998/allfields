import React from 'react'
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import Form from './Form';
import backgroundImage from '../../assets/pexels-stanley-morales-3148452.jpg';

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

const Login = () => {
  return (
		<Wrapper>
			<Navbar></Navbar>
			<Content>
				<Form></Form>
			</Content>
		</Wrapper>
	);
}

export default Login