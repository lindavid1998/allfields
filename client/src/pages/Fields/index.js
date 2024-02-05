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

				const fields = Object.values(data);
				let neighborhoods = fields.map((field) => field.neighborhood);
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
			const filtered = Object.entries(allData).filter(([key, data]) =>
				neighborhoods.includes(data.neighborhood)
			);
			const result = Object.fromEntries(filtered);
			setDisplayedData(result);
		} else {
			setDisplayedData(allData);
		}
	};

	const handleSearch = (searchText) => {
		const fields = Object.entries(allData);

		const filtered = fields.filter((field) => {
			const [fieldId, data] = field
			return isSubstring(data.name, searchText);
		});

		const result = Object.fromEntries(filtered);
		setDisplayedData(result);
	};

	const isSubstring = (text, substr) => {
		text = text.toLowerCase();
		substr = substr.toLowerCase();
		return text.includes(substr);
	};

	return (
		<Wrapper>
			<MenuBar
				handleSearch={handleSearch}
				applyFilter={handleFilter}
				neighborhoods={neighborhoods}
			/>

			{Object.keys(displayedData).map((fieldId, index) => (
				<Listing
					key={index}
					id={fieldId}
					name={displayedData[fieldId].name}
					neighborhood={displayedData[fieldId].neighborhood}
					address={displayedData[fieldId].address}
					defaultImgPath={displayedData[fieldId].defaultImg}
				/>
			))}
		</Wrapper>
	);
};

export default Fields;
