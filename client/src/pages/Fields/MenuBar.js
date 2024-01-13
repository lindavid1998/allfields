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

const Buttons = ({ applyFilter, neighborhoods }) => {
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
		applyFilter(filters);
	};

	const handleReset = () => {
		setFilters([]);
		applyFilter([]);
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
				onClick={handleReset}
			/>
		</>
	);
};

const MenuBar = ({ applyFilter, neighborhoods }) => {
	return (
		<Wrapper>
			<Searchbar />

			<div>
				Or search by <strong>neighborhood:</strong>
			</div>

			<Buttons applyFilter={applyFilter} neighborhoods={neighborhoods} />
		</Wrapper>
	);
};

export default MenuBar;
