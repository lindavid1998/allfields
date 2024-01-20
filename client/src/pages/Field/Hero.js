import React from 'react'
import styled from 'styled-components';
import { useImagePathToURL } from '../../utils/utils';

const Wrapper = styled.div`
  height: 300px;
  position: relative;
`

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  filter: brightness(70%);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`

const Info = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	left: 5px;
	bottom: 5px;
	color: white;
	padding: 15px;
	& > * {
		margin: 0;
	}
`;

const Hero = ({ heroImg, name, address }) => {
	const heroImgURL = useImagePathToURL(heroImg);

	return (
		<Wrapper>
			<Image src={heroImgURL} alt={`Image of ${name}`}></Image>
			<Info>
				<h2>{name}</h2>
				<p>{address}</p>
			</Info>
		</Wrapper>
	);
};

export default Hero