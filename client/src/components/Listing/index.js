import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { storage } from '../../firebase';
import { ref, getDownloadURL } from 'firebase/storage';

const Wrapper = styled.div`
	display: flex;
	gap: 20px;
	max-width: 800px;
	cursor: pointer;
`;

const Img = styled.img`
	height: 220px;
	width: 330px;
	border-radius: 20px;
`;

const Details = styled.div`
	display: flex;
	flex-direction: column;
	color: var(--main-text-color);
	width: 380px;
`;

const Name = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
`;

const Neighborhood = styled.div`
	font-size: 1.2rem;
`;

const Address = styled.div`
	color: var(--gray-text-color);
	font-size: 0.9rem;
`;

const Icon = styled.div`
	margin-top: auto;
	margin-bottom: 8px;
	width: fit-content;
`;

const Listing = ({ index, name, neighborhood, address, defaultImg }) => {
	const [defaultImgURL, setDefaultImgURL] = useState(null);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		const fetchURL = async () => {
			try {
				const pathRef = ref(storage, defaultImg);
				const URL = await getDownloadURL(pathRef);
				setDefaultImgURL(URL);
			} catch (error) {
				console.log(error);
			}
		};
		fetchURL();
	}, []);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<Wrapper>
			<Img src={defaultImgURL} alt={`Image of ${name}`} />
			<Details>
				<Name>
					# {index + 1} - {name}
				</Name>
				<Neighborhood>{neighborhood}</Neighborhood>
				<Address>{address}</Address>
				<Icon onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
					<FontAwesomeIcon
						icon={isHovered ? solidHeart : regularHeart}
						size='2x'
					/>
				</Icon>
			</Details>
		</Wrapper>
	);
};

export default Listing;
