import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth } from '../../firebase.js';
import backgroundImage from '../../assets/pexels-ivan-siarbolin-3787832.jpg';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { PathContext } from '../../utils/utils.js';

const Content = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: flex-start;
	padding: 20px;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	text-align: left;
	max-width: var(--max-width);
`;

const Text = styled.div`
	display: flex;
	flex-direction: column;
	align-items: left;
	margin-right: 20px;
	margin-top: 50px;
	width: 50%;
`;

const ImgContainer = styled.div`
	border-radius: 40px;
	width: 450px;
	height: 750px; 
	overflow: hidden;
`;

const Img = styled.img`
	height: 100%;
	width: 100%;
	object-fit: cover;
`;

const AuthStatus = () => {
	const [status, setStatus] = useState(null);
	const [timer, setTimer] = useState(4);
	const navigate = useNavigate();

	const { redirectPath, setRedirectPath } = useContext(PathContext);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			user ? setStatus('in') : setStatus('out');
		});

		// start countdown timer
		setInterval(() => {
			setTimer((prevTimer) => prevTimer - 1);
		}, 1000);

		return () => unsubscribe();
	}, []);

	// route to previous page once timer is up
	useEffect(() => {
		if (timer <= 0) {
			navigate(redirectPath);
			setRedirectPath('/');
		}
	}, [timer]);

	return (
		<Content>
			<Text>
				<h4>
					You have been signed {status}. Back to{' '}
					<a href={redirectPath}>previous page</a>.
				</h4>
				<p>You will be automatically redirected in {timer} seconds.</p>
			</Text>

			<ImgContainer>
				<Img src={backgroundImage} />
			</ImgContainer>
		</Content>
	);
};

export default AuthStatus;
