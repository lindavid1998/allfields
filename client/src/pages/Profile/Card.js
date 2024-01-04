import React, { useState } from 'react';
import Avatar from '../../components/Avatar';
import Spinner from '../../components/Spinner';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import AvatarForm from './AvatarForm';
import Button from '../../components/Button';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Div = styled.div`
	background-color: var(--main-bg-color);
	box-shadow: 0 8px 16px -1px rgba(0, 0, 0, 0.3);
	width: 30%;
	height: fit-content;
`;

const Test = styled(Avatar)`
	transition: filter 0.3s ease;
	&:hover {
		filter: brightness(60%);
	}
`;

const Card = ({ name, joinDate }) => {
	const { userId } = useParams();
	const [isFormVisible, setIsFormVisible] = useState(false);

	const toggleVisibility = () => {
		setIsFormVisible((prev) => !prev);
	};

	return (
		<Div>
			<Avatar className='md' userId={userId}>
				{/* <FontAwesomeIcon icon={faPen} style={{ color: 'white' }} /> */}
			</Avatar>

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

			<Button
				text='Change photo'
				className='sm-btn'
				onClick={() => setIsFormVisible((prev) => !prev)}
			/>
		</Div>
	);
};

export default Card;
