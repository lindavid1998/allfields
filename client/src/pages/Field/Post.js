import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getUserFullName } from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { db, auth, getUserId } from '../../firebase';
import { ref, remove } from 'firebase/database';
import { capitalize } from '../../utils';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid var(--light-text-color);
	padding: 20px 0;
	position: relative;
	&:first-child {
		padding-top: 5px;
	}
	&:last-child {
		border-bottom: none;
	}
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
	&:not(:last-child) {
		margin-bottom: 15px;
	}
`;

const Icons = styled.div`
	display: flex;
	gap: 10px;
	position: absolute;
	top: 20px;
	right: 50px;
`

const Icon = styled.div`
	transition: transform 0.2s ease-in-out;
	&:hover {
		transform: scale(1.2);
	}
`;

const Post = ({ body, postDate, visitDate, userId, postId, conditions, editPost }) => {
	let [name, setName] = useState('');
	let [isAuthorizedUser, setIsAuthorizedUser] = useState(false);

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
		setIsAuthorizedUser(currentUserId === userId);
	}, [userId]);

	const deletePost = async (postId) => {
		try {
			const confirmed = window.confirm('Are you sure you want to delete?');
			if (confirmed) await remove(ref(db, 'posts/' + postId));
		} catch (err) {
			console.log(err);
		}
	};

	const convertConditionsToString = (conditions) => {
		let entries = Object.entries(conditions); // convert conditions object to an array of key-value pairs
		let filteredEntries = entries.filter(([key, value]) => value); // only keep pairs that have value of true
		let arr = filteredEntries.map((subArr) => capitalize(subArr[0])); // map filtered keys to an array
		return arr.join(', '); // join array by comma, capitalizing each word
	};

	const conditionsString = conditions ? convertConditionsToString(conditions) : '';

	return (
		<Wrapper>
			{isAuthorizedUser ? (
				<Icons>
					<Icon onClick={editPost}>
						<FontAwesomeIcon icon={faPenToSquare} />
					</Icon>

					<Icon onClick={() => deletePost(postId)}>
						<FontAwesomeIcon icon={faTrashCan} />
					</Icon>
				</Icons>
			) : null}

			<User>{name}</User>
			<Date>{postDate}</Date>
			<Body>{body}</Body>

			{visitDate ? (
				<div>
					<strong>Date visited: </strong> {visitDate}
				</div>
			) : null}

			{conditionsString ? (
				<div>
					<strong>Conditions:</strong> {conditionsString}
				</div>
			) : null}
		</Wrapper>
	);
};

export default Post;
