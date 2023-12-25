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
	color: var(--main-text-color);
	&:first-child {
		padding-top: 5px;
	}
	&:last-child {
		border-bottom: none;
	}
	& > * {
		margin: 0;
	}
`;

const Body = styled.p`
	margin: 1rem 1rem 1rem 0;
	&:last-child {
		margin-bottom: 0;
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

			<h6 className='bold-text'>{name}</h6>
			<p className='gray small'>{postDate}</p>
			<Body>{body}</Body>

			{visitDate ? (
				<p>
					<strong>Date visited: </strong> {visitDate}
				</p>
			) : null}

			{conditionsString ? (
				<p>
					<strong>Conditions:</strong> {conditionsString}
				</p>
			) : null}
		</Wrapper>
	);
};

export default Post;
