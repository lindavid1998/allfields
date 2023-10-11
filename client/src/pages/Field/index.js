import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MenuBar from './MenuBar';
import Post from './Post';
import Form from './Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { ref, onValue, equalTo, query, orderByChild } from 'firebase/database';

const Wrapper = styled.div`
	max-width: var(--max-width);
	padding: 10px 16px;
	width: 100%;
	color: var(--main-text-color);
`;

const Back = styled(Link)`
	display: flex;
	gap: 10px;
	align-items: center;
	color: var(--main-text-color);
`;

const Posts = styled.div`
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const PositionedForm = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.8);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 999;
`;

const Field = () => {
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [fieldData, setFieldData] = useState(null);
	const [postData, setPostData] = useState(null);
	const [isPostDataEmpty, setIsPostDataEmpty] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		const getFieldData = async () => {
			try {
				const dataRef = ref(db, 'fields/' + id);
				onValue(dataRef, (snapshot) => {
					setFieldData(snapshot.val());
				});
			} catch (err) {
				console.log(err);
			}
		};

		const getPostData = async () => {
			try {
				const dataRef = query(
					ref(db, 'posts'),
					orderByChild('fieldId'),
					equalTo(id)
				);

				onValue(dataRef, (snapshot) => {
					const data = snapshot.val();
					if (snapshot.exists()) {
						setPostData(data);
						setIsPostDataEmpty(false);
					} else {
						setIsPostDataEmpty(true);
					}
				});
			} catch (err) {
				console.log(err);
			}
		};

		getFieldData();
		getPostData();
	}, [id]);

	const toggleFormVisibility = () => {
		setIsFormVisible((prevState) => !prevState);
	};

	return (
		<Wrapper>
			<Back to='/fields'>
				<FontAwesomeIcon icon={faArrowLeft} />
				<div>Back to search</div>
			</Back>

			{fieldData ? (
				<>
					<h1>{fieldData.name}</h1>
					<h3>{fieldData.address}</h3>
					<MenuBar toggleVisibility={toggleFormVisibility} />
				</>
			) : (
				<p>Loading...</p>
			)}

			<Posts>
				{isPostDataEmpty ? (
					<p>No posts here yet!</p>
				) : postData ? (
					Object.entries(postData).map(([postId, data], index) => (
						<Post
							key={index}
							postId={postId}
							body={data.body}
							postDate={data.postDate}
							visitDate={data.visitDate}
							userId={data.userId}
							conditions={data.conditions}
						/>
					))
				) : (
					<p>Loading...</p>
				)}
			</Posts>

			{isFormVisible && (
				<PositionedForm>
					<Form toggleVisibility={toggleFormVisibility} />
				</PositionedForm>
			)}
		</Wrapper>
	);
};

export default Field;
