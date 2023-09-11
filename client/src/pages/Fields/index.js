import React from 'react';
import styled from 'styled-components';
import Listing from '../../components/Listing';
import doyleImg from '../../assets/doyle-park.webp';
import fourSImg from '../../assets/4S-Ranch.jpeg';
import SearchBar from '../../components/SearchBar';
import Button from '../../components/Button';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	gap: 25px;
	padding: 10px 16px;
	max-width: 1085px;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
	flex-wrap: wrap;
	width: 100%;
`;

const fields = [
	{
		name: 'Doyle Community Park',
		address: '8175 Regents Rd',
		city: 'San Diego',
		zip: '92122',
		neighborhood: 'La Jolla',
		defaultImg: `${doyleImg}`,
	},
	{
		name: '4S Ranch Sports Park',
		address: '16118 4S Ranch Pkwy',
		city: 'San Diego',
		zip: '92127',
		neighborhood: 'Rancho Penasquitos',
		defaultImg: `${fourSImg}`,
	},
];

const Fields = () => {
	return (
		<Wrapper>
			<Header>
				<SearchBar />
				<div>
					Or search by <strong>neighborhood:</strong>
				</div>
				<Button color='light' text='Mira Mesa' />
				<Button color='light' text='La Jolla' />
				<Button color='light' text='Rancho Penasquitos' />
				<Button color='light' text='Kearny Mesa' />
			</Header>

			{fields.map((field, index) => (
				<Listing
					key={index}
					name={field.name}
					neighborhood={field.neighborhood}
					address={field.address}
					defaultImg={field.defaultImg}
				/>
			))}
		</Wrapper>
	);
};

export default Fields;
