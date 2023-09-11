import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
// import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
	display: flex;
	gap: 20px;
	width: 800px;
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
`

const Icon = styled.div`
	margin-top: auto;
	margin-bottom: 8px;
`

const Listing = ({name, neighborhood, address, defaultImg}) => {
	return (
		<Wrapper>
			<Img src={defaultImg} alt={`Image of ${name}`} />
			<Details>
				<Name>{name}</Name>
				<Neighborhood>{neighborhood}</Neighborhood>
				<Address>{address}</Address>
				<Icon>
					<FontAwesomeIcon icon={regularHeart} size='2x' />
				</Icon>
			</Details>
		</Wrapper>
	);
};

export default Listing;
