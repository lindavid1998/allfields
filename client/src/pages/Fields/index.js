import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Listing from '../../components/Listing';
import MenuBar from './MenuBar';
import { db } from '../../firebase';
import { ref, get } from 'firebase/database';
import Spinner from '../../components/Spinner';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: flex-start;
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
				setData(snapshot.val());
			} catch (err) {
				console.log(err);
			}
		};
		getFieldsData();
	}, []);

	if (!data) return <Spinner />;

	return (
		<Wrapper>
			<MenuBar />
			{data.map((field, index) => (
				<Listing
					key={index}
					id={index}
					name={field.name}
					neighborhood={field.neighborhood}
					address={field.address}
					defaultImgPath={field.defaultImg}
				/>
			))}
		</Wrapper>
	);
};

export default Fields;
