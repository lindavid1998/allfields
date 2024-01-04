import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getUserFullName } from '../firebase';
import { db, auth, getUserId } from '../firebase';
import { ref, remove, get } from 'firebase/database';
import { capitalize } from '../utils';
import PostIcons from './PostIcons';
import PostHeader from './PostHeader';

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
	margin: 1rem 50px 1rem 0;
	&:last-child {
		margin-bottom: 0;
	}
`;

const Post = ({
	body,
	postDate,
	visitDate,
	userId,
	postId,
	conditions,
	editPost,
	showIcons = true,
	header = 'name',
	fieldId,
}) => {
	let [name, setName] = useState('');
	let [field, setField] = useState('');
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

		const fetchFieldName = async () => {
			try {
				const fieldRef = ref(db, `/fields/${fieldId}`);
				const snapshot = await get(fieldRef);
				const field = snapshot.val();
				setField(field.name);
			} catch (error) {
				console.error(error);
			}
		};

		if (header === 'name') {
			fetchName();
		} else {
			fetchFieldName();
		}

		let currentUserId = getUserId(auth);
		setIsAuthorizedUser(currentUserId === userId);
	}, [header, userId, fieldId]);

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

		if (arr.length == 0) return ''

		return arr.join(', '); // join array by comma, capitalizing each word
	};
	
	const conditionsString = convertConditionsToString(conditions)

	return (
		<Wrapper>
			{isAuthorizedUser && showIcons && <PostIcons postId={postId} editPost={editPost} deletePost={deletePost} />}

			<PostHeader header={header} fieldId={fieldId} userId={userId} field={field} name={name} postDate={postDate} />

			{/* <p className='gray small'>{postDate}</p> */}

			<Body>{body}</Body>

			{visitDate && (
				<p>
					<strong>Date visited: </strong> {visitDate}
				</p>
			)}

			{conditionsString && (
				<p>
					<strong>Conditions:</strong> {conditionsString}
				</p>
			)}
		</Wrapper>
	);
};

export default Post;
