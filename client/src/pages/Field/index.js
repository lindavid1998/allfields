import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MenuBar from './MenuBar';
import Post from './Post';
import Form from './Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import {
	ref,
	onValue,
	equalTo,
	query,
	orderByChild,
	get,
} from 'firebase/database';

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
				const snapshot = await get(dataRef);
				let data = snapshot.val();
				setPostData(Object.values(data));
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
					<MenuBar handleVisibility={toggleFormVisibility} />
				</>
			) : (
				<p>Loading...</p>
			)}

			<Posts>
				{postData ? (
					postData.map((item, index) => (
						<Post
							key={index}
							body={item.body}
							date={item.date}
							userId={item.userId}
						/>
					))
				) : (
					<p>Loading...</p>
				)}
			</Posts>

			{isFormVisible && (
				<PositionedForm>
					<Form handleVisibility={toggleFormVisibility} />
				</PositionedForm>
			)}
		</Wrapper>
	);
};

export default Field;
