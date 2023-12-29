import React, { useState, useEffect } from 'react'
import { getUserFullName, db } from '../../firebase';
import { ref, get } from 'firebase/database';
import Card from './Card';
import Activity from './Activity';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

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
	const { userId } = useParams();
	const [name, setName] = useState(null);
	const [joinDate, setJoinDate] = useState(null);

	useEffect(() => {
		const getName = async () => {
			try {
				setName(await getUserFullName(userId));
			} catch (error) {
				console.error(error);
			}
		};

		const getUserJoinDate = async () => {
			try {
				const userRef = ref(db, 'users/' + userId);
				const snapshot = await get(userRef);
				setJoinDate(snapshot.val().joinDate);
			} catch (err) {
				console.log(err);
			}
		};

		getName();
		getUserJoinDate();
	}, [userId]);

  return (
		<Wrapper>
			<Div>
				<Card name={name} joinDate={joinDate} />
				<Activity key={userId} />
			</Div>
		</Wrapper>
	);
}

export default Profile;