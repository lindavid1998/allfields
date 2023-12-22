import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useImagePathToURL } from '../utils';
import Spinner from './Spinner';

const Wrapper = styled.div`
	display: flex;
	gap: 20px;
	max-width: 800px;
	cursor: pointer;
`;

const Img = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 20px;
`;

const Details = styled.div`
	display: flex;
	flex-direction: column;
	color: var(--main-text-color);
	width: 380px;
	& > * {
		margin: 0;
	}
`;

const StyledLink = styled(Link)`
	color: var(--main-text-color);
	& > * {
		margin: 0;
	}
`;

const Address = styled.p`
	color: var(--gray-text-color);
`;

const Icon = styled.div`
	margin-top: auto;
	margin-bottom: 8px;
	width: fit-content;
`;

const Div = styled.div`
	height: 220px;
	width: 330px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Listing = ({ id, name, neighborhood, address, defaultImgPath }) => {
	const imgUrl = useImagePathToURL(defaultImgPath)
	const [isHovered, setIsHovered] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const handleLoad = () => {
		setIsLoading(false);
	}

	return (
		<Wrapper>
			<Link to={`/fields/${id}`}>
				<Div>
					{isLoading && <Spinner />}
					<Img
						src={imgUrl}
						alt={`Image of ${name}`}
						style={{ display: isLoading ? 'none' : 'block' }}
						onLoad={handleLoad}
					/>
				</Div>
			</Link>
			<Details>
				<StyledLink to={`/fields/${id}`}>
					<h5>
						# {id + 1} - {name}
					</h5>
				</StyledLink>
				<p>{neighborhood}</p>
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
