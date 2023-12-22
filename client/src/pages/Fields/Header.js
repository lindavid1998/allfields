import React from 'react';
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
	padding: 15px 0;
`;

const Header = () => {
	return (
		<Wrapper>
			<Searchbar />
			<div>
				Or search by <strong>neighborhood:</strong>
			</div>
			<Button className='light-btn sm-btn' text='Mira Mesa' />
			<Button className='light-btn sm-btn' text='La Jolla' />
			<Button className='light-btn sm-btn' text='Rancho Penasquitos' />
			<Button className='light-btn sm-btn' text='Kearny Mesa' />
		</Wrapper>
	);
};

export default Header;
