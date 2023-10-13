import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { storage } from '../../firebase';
import { ref, getDownloadURL } from 'firebase/storage';

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

const Name = styled.h1`
  margin: 0;
`

const Address = styled.h2`
  margin: 0;
`

const Info = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
  left: 5px;
	bottom: 5px;
  color: white;
  padding: 15px;
`;

const Hero = ({ heroImg, name, address }) => {
  const [heroImgURL, setHeroImgURL] = useState(null);

  useEffect(() => {
		const fetchURL = async () => {
			try {
				const pathRef = ref(storage, heroImg);
				const URL = await getDownloadURL(pathRef);
				setHeroImgURL(URL);
			} catch (error) {
				console.log(error);
			}
		};
		fetchURL();
  }, []);
  
	return (
		<Wrapper>
			<Image src={heroImgURL} alt={`Image of ${name}`}></Image>
			<Info>
				<Name>{name}</Name>
				<Address>{address}</Address>
			</Info>
		</Wrapper>
	);
};

export default Hero