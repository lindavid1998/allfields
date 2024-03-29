import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
	width: 370px;
	height: 32px;
	border-radius: 9999px;
	border: 1px solid var(--gray-text-color);
	display: flex;
	align-items: center;
	&:focus-within {
		border-width: 2px;
	}
`;

const Input = styled.input`
	width: 100%;
	height: 100%;
	padding: 0 16px;
	background: transparent;
	color: black;
	border: none;
`;

const Icon = styled.div`
	position: relative;
	left: 10px;
	color: var(--gray-text-color);
`;

const SearchBar = ({ query, handleSearch}) => {
	return (
		<Wrapper>
			<Icon>
				<FontAwesomeIcon icon={faMagnifyingGlass} />
			</Icon>
			<Input
				onChange={(e) => handleSearch(e.target.value)}
				type='text'
				value={query}
				placeholder='Enter a city or park name'
			/>
		</Wrapper>
	);
};

export default SearchBar;
