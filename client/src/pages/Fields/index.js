import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Listing from '../../components/Listing';
import MenuBar from './MenuBar';
import { db } from '../../firebase';
import { ref, get } from 'firebase/database';
import Spinner from '../../components/Spinner';
import Map from './Map';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: flex-start;
	gap: 25px;
	padding: 10px 16px;
	max-width: 1085px;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column-reverse;
	gap: 25px;
	width: 100%;

	@media (min-width: 1100px) {
		flex-direction: row;
		gap: 0;
	}
`;

const Listings = styled.div`
	display: flex;
	flex-direction: column;
	gap: 25px;
`;

const Fields = () => {
	const [allData, setAllData] = useState(null);
	const [displayedData, setDisplayedData] = useState(null);
	const [filteredData, setFilteredData] = useState(null);
	const [neighborhoods, setNeighborhoods] = useState(null);
	const [query, setQuery] = useState('');

	useEffect(() => {
		const getFieldsData = async () => {
			try {
				const fieldsRef = ref(db, 'fields');
				const snapshot = await get(fieldsRef);
				const data = snapshot.val();

				setDisplayedData(data);
				setFilteredData(data);
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
			setFilteredData(result);
			setDisplayedData(result);
		} else {
			setDisplayedData(allData);
		}
	};

	const handleSearch = (searchText) => {
		setQuery(searchText);

		const fields = Object.entries(filteredData);

		const searchResult = fields.filter((field) => {
			const [fieldId, data] = field;
			return isSubstring(data.name, searchText);
		});

		const result = Object.fromEntries(searchResult);
		setDisplayedData(result);
	};

	const resetSearch = () => {
		setDisplayedData(allData);
		setQuery('');
	};

	const isSubstring = (text, substr) => {
		text = text.toLowerCase();
		substr = substr.toLowerCase();
		return text.includes(substr);
	};

	const isSearchResultEmpty = () => {
		return Object.keys(displayedData).length === 0;
	};

	return (
		<Wrapper>
			<MenuBar
				handleSearch={handleSearch}
				handleFilter={handleFilter}
				neighborhoods={neighborhoods}
				resetSearch={resetSearch}
				query={query}
			/>

			<Container>
				{isSearchResultEmpty() ? (
					<h4>Whoops... no results!</h4>
				) : (
					<Listings>
						{Object.keys(displayedData).map((fieldId, index) => (
							<Listing
								key={index}
								id={fieldId}
								name={`${index + 1} - ${displayedData[fieldId].name}`}
								neighborhood={displayedData[fieldId].neighborhood}
								address={displayedData[fieldId].address}
								defaultImgPath={displayedData[fieldId].defaultImg}
							/>
						))}
					</Listings>
				)}

				<Map markers={Object.values(displayedData)} />
			</Container>
		</Wrapper>
	);
};

export default Fields;
