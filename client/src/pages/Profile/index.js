import React from 'react'
import Card from './Card';
import Activity from './Activity';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-color: #efefec;
	padding-top: 25px;
`;

const Div = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 20px;
	width: 100%;
	height: 100%;
	max-width: var(--max-width);
	padding: 0 16px;
	> * {
		border-radius: 16px;
		padding: 30px;
	}
`;

const Profile = () => {
  return (
		<Wrapper>
			<Div>
				<Card></Card>
				<Activity></Activity>
			</Div>
		</Wrapper>
	);
}

export default Profile;