import React, { useEffect, useState } from 'react';
import { getUserFullName, db } from '../../firebase';
import { useParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import Avatar from '../../components/Avatar';

const Card = () => {
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
	}, []);

	return (
		<div
			style={{
				backgroundColor: 'var(--main-bg-color)',
				boxShadow: '0 8px 16px -1px rgba(0,0,0,.3)',
				width: '30%',
				height: 'fit-content',
			}}
		>
			<Avatar className='md' />
			<h4>{name ? name : 'Loading...'}</h4>
			<p>{joinDate ? `Member since ${joinDate}` : 'Loading...'}</p>
		</div>
	);
};

export default Card;
