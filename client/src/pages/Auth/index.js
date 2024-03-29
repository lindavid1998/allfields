import React from 'react';
import styled from 'styled-components';
import { SignUpForm } from '../../components/SignUpForm';
import { SignInForm } from '../../components/SignInForm';

import { useImagePathToURL } from '../../utils/utils';

const Content = styled.div`
	width: 100%;
	height: 100vh;
	background-image: url(${(props) => props.background});
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 50px;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`;

const Auth = ({ isSignIn, background }) => {
	const imageURL = useImagePathToURL(`images/backgrounds/${background}`);

	return (
		<Content background={imageURL}>
			{isSignIn ? <SignInForm /> : <SignUpForm />}
		</Content>
	);
};

export default Auth;
