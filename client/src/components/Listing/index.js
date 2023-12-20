import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useImagePathToURL } from '../../utils';

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

const StyledLink = styled(Link)`
	font-size: 1.3rem;
	font-weight: bold;
	color: var(--main-text-color);
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

const Listing = ({ id, name, neighborhood, address, defaultImgPath }) => {
	const imgUrl = useImagePathToURL(defaultImgPath)
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<Wrapper>
			<Link to={`/fields/${id}`}>
				<Img src={imgUrl} alt={`Image of ${name}`} />
			</Link>
			<Details>
				<StyledLink to={`/fields/${id}`}>
					<div>
						# {id + 1} - {name}
					</div>
				</StyledLink>
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
