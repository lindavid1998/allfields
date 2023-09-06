import React from 'react';
import styled from 'styled-components';
import Hero from './Hero';
import Subhero from './Subhero';
import SignUp from './SignUp';
import Quotes from './Quotes';
import Footer from '../../components/Footer';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 0;
	align-items: center;
	width: 100%;
`;

const Landing = () => {
	return (
		<Wrapper>
			<Hero />
			<Subhero />
			<SignUp />
			<Quotes />
			<Footer />
		</Wrapper>
	);
};

export default Landing;
