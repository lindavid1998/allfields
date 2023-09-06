import React from 'react';
import Button from '../../components/Button';
import styled from 'styled-components';
import heroImg from '../../assets/soccer-background.jpeg';

const StyledH1 = styled.h1`
	color: #fff;
	font-size: 50px;
`;

const Wrapper = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Img = styled.img`
	height: 315px;
	width: 100%;
	object-fit: cover;
	filter: brightness(0.7);
`;

const Text = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: absolute;
	text-align: center;
`;

const Hero = () => {
	return (
		<Wrapper>
			<Img alt='Soccer balls in front of goal' src={heroImg} />
			<Text>
				<StyledH1>Enjoy the beautiful game</StyledH1>
				<Button size='medium' text='Find nearby fields' color='bright'></Button>
			</Text>
		</Wrapper>
	);
};

export default Hero;
