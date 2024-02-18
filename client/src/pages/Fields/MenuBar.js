import React, { useState } from 'react';
import styled from 'styled-components';
import Searchbar from '../../components/Searchbar';
import Button from '../../components/Button';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
	flex-wrap: wrap;
	width: 100%;
	position: sticky;
	top: 0px;
	background-color: var(--main-bg-color);
	padding: 10px 0;
`;

const Buttons = ({ resetSearch, handleFilter, neighborhoods }) => {
	const [filters, setFilters] = useState([]);

	const handleClick = (e) => {
		// check if filter is already active
		const index = filters.indexOf(e.target.textContent);
		
		// if active, remove from filters. else, add
		if (index != -1) {
			filters.splice(index, 1);
		} else {
			filters.push(e.target.textContent);
		}

		setFilters(filters);
		handleFilter(filters);
	};

	return (
		<>
			{neighborhoods.map((area, index) => (
				<Button
					onClick={handleClick}
					key={index}
					className={`sm-btn ${!filters.includes(area) && 'light-btn'}`}
					text={area}
				/>
			))}
			<Button
				className='blue-btn sm-btn'
				text='Reset filter'
				onClick={() => {
					resetSearch()
					setFilters([])
				}}
			/>
		</>
	);
};

const MenuBar = ({ handleSearch, handleFilter, neighborhoods, resetSearch, query }) => {
	return (
		<Wrapper>
			<Searchbar query={query} handleSearch={handleSearch} />

			<div>
				Or search by <strong>neighborhood:</strong>
			</div>

			<Buttons resetSearch={resetSearch} handleFilter={handleFilter} neighborhoods={neighborhoods} />
		</Wrapper>
	);
};

export default MenuBar;
