import React from 'react';
import styled from 'styled-components';
import SearchBar from '../../components/SearchBar';
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
	padding: 15px 0;
`;

const Header = () => {
	return (
		<Wrapper>
			<SearchBar />
			<div>
				Or search by <strong>neighborhood:</strong>
			</div>
			<Button color='light' text='Mira Mesa' />
			<Button color='light' text='La Jolla' />
			<Button color='light' text='Rancho Penasquitos' />
			<Button color='light' text='Kearny Mesa' />
		</Wrapper>
	);
};

export default Header;
