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
	const [allData, setAllData] = useState(null);
	const [displayedData, setDisplayedData] = useState(null);
	const [neighborhoods, setNeighborhoods] = useState(null);

	useEffect(() => {
		const getFieldsData = async () => {
			try {
				const fieldsRef = ref(db, 'fields');
				const snapshot = await get(fieldsRef);
				const data = snapshot.val();
				setDisplayedData(data);
				setAllData(data);

				let neighborhoods = data.map((field) => field.neighborhood);
				neighborhoods = Array.from(new Set(neighborhoods));
				setNeighborhoods(neighborhoods);
			} catch (err) {
				console.log(err);
			}
		};

		getFieldsData();
	}, []);

	if (!allData) return <Spinner />;

	const handleFilter = (neighborhoods) => {
		const hasFilter = neighborhoods.length !== 0;

		if (hasFilter) {
			const result = allData.filter((field) =>
				neighborhoods.includes(field.neighborhood)
			);

			setDisplayedData(result);
		} else {
			setDisplayedData(allData);
		}
	};

	return (
		<Wrapper>
			<MenuBar applyFilter={handleFilter} neighborhoods={neighborhoods} />

			{console.log(displayedData)}

			{displayedData.map((field, index) => (
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
