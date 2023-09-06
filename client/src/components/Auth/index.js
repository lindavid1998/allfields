import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth } from '../../firebase.js';
import backgroundImage from '../../assets/pexels-ivan-siarbolin-3787832.jpg';
import { useNavigate } from 'react-router-dom';

const Content = styled.div`
	width: 100%;
	height: 100vh;
	background-image: url(${backgroundImage});
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H2 = styled.h2`
  margin: 0;
` 

const AuthStatus = () => {
  const [status, setStatus] = useState(null);
  const [timer, setTimer] = useState(4);
  const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
      user ? setStatus('in') : setStatus('out')
    });

    // start countdown timer
    setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000)

		return () => unsubscribe();
  }, []);
  
  // route to landing page once timer is up
  useEffect(() => {
    if (timer <= 0) {
			navigate('/');
		}
  }, [timer])

	return (
		<Content>
			<Div>
        <H2>
          You have been signed {status}. Back to <a href='/'>home</a>.
        </H2>
        <p>You will be automatically redirected in {timer} seconds.</p>
      </Div>
		</Content>
	);
};

export default AuthStatus;
