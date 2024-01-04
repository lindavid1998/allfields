import React, { useState } from 'react';
import Avatar from '../../components/Avatar';
import Spinner from '../../components/Spinner';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import AvatarForm from './AvatarForm';
import { auth } from '../../firebase';

const Div = styled.div`
	background-color: var(--main-bg-color);
	box-shadow: 0 8px 16px -1px rgba(0, 0, 0, 0.3);
	width: 30%;
	height: fit-content;
`;

const Card = ({ name, joinDate }) => {
	const { userId } = useParams();
	const [isFormVisible, setIsFormVisible] = useState(false);

	const toggleVisibility = () => {
		setIsFormVisible((prev) => !prev);
	};

	const showEdit = userId === auth.currentUser?.uid;

	return (
		<Div>
			<Avatar
				className={`md ${showEdit && 'show-edit'}`}
				userId={userId}
				onClick={toggleVisibility}
				showEdit={showEdit}
			/>

			<h4>{name ? name : <Spinner className='spinner sm' />}</h4>

			{joinDate ? (
				<p>Member since {joinDate}</p>
			) : (
				<Spinner className='spinner sm' />
			)}

			{isFormVisible && (
				<div className='form-overlay'>
					<AvatarForm toggleVisibility={toggleVisibility} />
				</div>
			)}
		</Div>
	);
};

export default Card;
