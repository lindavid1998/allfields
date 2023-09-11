import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Listing from '../../components/Listing';
import Header from './Header';
import { db } from '../../firebase';
import { ref, get } from 'firebase/database';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	gap: 25px;
	padding: 10px 16px;
	max-width: 1085px;
`;

const Fields = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const getFieldsData = async () => {
			try {
				const fieldsRef = ref(db, 'fields');
				const snapshot = await get(fieldsRef);
				console.log(snapshot.val());
				setData(snapshot.val());
			} catch (err) {
				console.log(err);
			}
		}
		getFieldsData();
	}, []);
	
	return (
		<Wrapper>
			<Header />
			{data ? (
				data.map((field, index) => (
					<Listing
						key={index}
						index={index}
						name={field.name}
						neighborhood={field.neighborhood}
						address={field.address}
						defaultImg={field.defaultImg}
					/>
				))
			) : (
				<p>Loading...</p>
			)}
		</Wrapper>
	);
};

export default Fields;
