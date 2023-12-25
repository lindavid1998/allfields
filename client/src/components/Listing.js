import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useImagePathToURL } from '../utils';
import Spinner from './Spinner';
import { db, auth, getUserId } from '../firebase';
import { ref, set, get, remove, onValue } from 'firebase/database';
import { PathContext } from '../utils';

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
	const imgUrl = useImagePathToURL(defaultImgPath);
	const [isHovered, setIsHovered] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isFavorite, setIsFavorite] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const { setRedirectPath } = useContext(PathContext);

	const uid = getUserId(auth);
	const favoritesRef = ref(db, `/users/${uid}/favorites/${id}`);

	useEffect(() => {
		const unsubscribe = onValue(favoritesRef, (snapshot) => {
			snapshot.exists() ? setIsFavorite(true) : setIsFavorite(false);
		});

		return () => unsubscribe(); // Unsubscribe when the component unmounts
	}, [favoritesRef]); 

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const handleLoad = () => {
		setIsLoading(false);
	};

	const handleFavorite = () => {
		// if user is not signed in, route to sign in page
		if (!uid) {
			setRedirectPath(location.pathname)
			navigate('/sign-in');
			return
		}

		get(favoritesRef)
			.then((snapshot) => {
				snapshot.exists() ? remove(favoritesRef) : set(favoritesRef, true);
			})
			.catch(console.error);
	};

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
				<Icon
					onClick={handleFavorite}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<FontAwesomeIcon
						icon={isHovered || isFavorite ? solidHeart : regularHeart}
						size='2x'
					/>
				</Icon>
			</Details>
		</Wrapper>
	);
};

export default Listing;
