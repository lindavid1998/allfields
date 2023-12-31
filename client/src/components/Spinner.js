import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
	display: grid;
	justify-content: center;
	align-items: center;
	height: min(100%, 350px);
`;

const Spinner = styled.div`
	width: 50px;
	height: 50px;
	border: 10px solid #f3f3f3; 
	border-top: 10px solid #383636; 
	border-radius: 50%;
	animation: ${spinner} 1.5s linear infinite;
`;

const LoadingSpinner = ({ className }) => {
	return (
		<Container>
			<Spinner className={className} />
		</Container>
	);
};

export default LoadingSpinner;
