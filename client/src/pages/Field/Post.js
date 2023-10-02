import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getUserFullName } from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { db, auth, getUserId } from '../../firebase';
import { ref, remove } from 'firebase/database';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid var(--light-text-color);
	padding: 10px 0;
	position: relative;
`;

const User = styled.div`
	color: var(--main-text-color);
	font-weight: bold;
`;

const Date = styled.div`
	font-size: 0.8rem;
	color: var(--gray-text-color);
	margin-bottom: 15px;
`;

const Body = styled.div`
	color: var(--main-text-color);
`;

const Icon = styled.div`
	position: absolute;
	top: 10px;
	right: 50px;
	transition: transform 0.2s ease-in-out;
	&:hover {
		transform: scale(1.2);
	}
`;

const Post = ({ body, date, userId, postId }) => {
	let [name, setName] = useState('');
	let [isDeleteVisible, setIsDeleteVisible] = useState(false);

	useEffect(() => {
		const fetchName = async () => {
			try {
				const fullName = await getUserFullName(userId);
				setName(fullName);
			} catch (error) {
				console.error(error);
			}
		};
		
		fetchName();

		let currentUserId = getUserId(auth);
		setIsDeleteVisible(currentUserId === userId);
	}, []);

	const deletePost = async (postId, userId) => {
		try {
			const confirmed = window.confirm('Are you sure you want to delete?');
			if (confirmed) await remove(ref(db, 'posts/' + postId));
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Wrapper>
			<User>{name}</User>
			<Date>{date}</Date>
			<Body>{body}</Body>
			{isDeleteVisible ? (
				<Icon onClick={() => deletePost(postId, userId)}>
					<FontAwesomeIcon icon={faTrashCan} />
				</Icon>
			) : null}
		</Wrapper>
	);
};

export default Post;
