import React from 'react';
import Avatar from '../../components/Avatar';
import Spinner from '../../components/Spinner';
import styled from 'styled-components';

const Div = styled.div`
	background-color: var(--main-bg-color);
	box-shadow: 0 8px 16px -1px rgba(0, 0, 0, 0.3);
	width: 30%;
	height: fit-content;
`;

const Card = ({ name, joinDate }) => {
	return (
		<Div>
			<Avatar className='md' />

			<h4>{name ? name : <Spinner className='spinner sm' />}</h4>

			{joinDate ? (
				<p>Member since {joinDate}</p>
			) : (
				<Spinner className='spinner sm' />
			)}
		</Div>
	);
};

export default Card;
