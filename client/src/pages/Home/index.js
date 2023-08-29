import React from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
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
`;

const Home = () => {
	return (
		<Wrapper>
			<Navbar></Navbar>
			<Hero></Hero>
			<Subhero></Subhero>
			<SignUp></SignUp>
			<Quotes></Quotes>
			<Footer></Footer>
		</Wrapper>
	);
};

export default Home;
