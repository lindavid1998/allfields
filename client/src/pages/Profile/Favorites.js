import React, { useEffect, useState } from 'react';
import Listing from '../../components/Listing';
import { useParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { db } from '../../firebase';
import styled from 'styled-components';
import Spinner from '../../components/Spinner';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const Favorites = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [lastRemoved, setLastRemoved] = useState(null);
	const { userId } = useParams();
	
	useEffect(() => {
		const getFavoritesArray = async () => {
			// returns an array of fieldIds that are favorited by userId, or empty array if no favorites
			const snapshot = await get(ref(db, `users/${userId}/favorites`));
			return snapshot.val() ? Object.keys(snapshot.val()) : [];
		};

		const getFieldData = async (fieldId) => {
			// returns data object for fieldId
			const snapshot = await get(ref(db, `fields/${fieldId}`));
			const data = snapshot.val();
			data['id'] = fieldId;
			return data;
		};

		const getFavorites = async () => {
			// fetch favorites and update state
			const output = [];
			const favorites = await getFavoritesArray();
			for (let favorite of favorites) {
				output.push(await getFieldData(favorite));
			}

			setData(output);
			setIsLoading(false);
		};

		getFavorites();
	}, [lastRemoved]);
	
	if (isLoading) return <Spinner />;

	return (
		<Wrapper>
			{data.length ? (
				data.map((field, index) =>  (
					<Listing
						key={field.id}
						id={field.id}
						name={field.name}
						neighborhood={field.neighborhood}
						address={field.address}
						defaultImgPath={field.defaultImg}
						onRemoveFavorite={() => setLastRemoved(field.id)}
					/>
				))
			) : (
				<p>No favorites yet</p>
			)}
		</Wrapper>
	);
};

export default Favorites;
