import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MenuBar from './MenuBar';
import Post from '../../components/Post';
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
	off,
} from 'firebase/database';
import Hero from './Hero';
import Spinner from '../../components/Spinner';

const Wrapper = styled.div`
	max-width: var(--max-width);
	width: 100%;
	height: fit-content;
	color: var(--main-text-color);
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 10px 16px;
`;

const Content = styled.div`
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: column;
	gap: 20px;
	border-top-left-radius: 30px;
	border-top-right-radius: 30px;
`;

const Back = styled(Link)`
	display: flex;
	gap: 10px;
	align-items: center;
	color: var(--main-text-color);
`;

const Posts = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px 16px;
`;

const PostForm = (props) => {
	return (
		<div className='form-overlay'>
			<Form {...props} />
		</div>
	);
};

const Field = () => {
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [fieldData, setFieldData] = useState(null);
	const [postData, setPostData] = useState(null);
	const [isPostDataEmpty, setIsPostDataEmpty] = useState(false);
	const [formData, setFormData] = useState(null);
	const { fieldId } = useParams();

	useEffect(() => {
		const getFieldData = async () => {
			try {
				const dataRef = ref(db, 'fields/' + fieldId);
				onValue(dataRef, (snapshot) => {
					setFieldData(snapshot.val());
				});
				return () => off(dataRef);
			} catch (err) {
				console.log(err);
			}
		};

		const getPostData = async () => {
			try {
				const dataRef = query(
					ref(db, 'posts'),
					orderByChild('fieldId'),
					equalTo(fieldId)
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

				return () => off(dataRef);
			} catch (err) {
				console.log(err);
			}
		};

		getFieldData();
		getPostData();
	}, [fieldId]);

	const toggleFormVisibility = () => {
		setIsFormVisible((prevState) => !prevState);
	};

	const handleEdit = (currentData) => {
		setFormData(currentData); // load form with current data
		toggleFormVisibility();
	};

	const openMaps = () => {
		var mapsUrl = `https://www.google.com/maps?q=${fieldData.latitude},${fieldData.longitude}`;
		window.open(mapsUrl, '_blank');
	};

	const toggleForm = () => {
		toggleFormVisibility();
		setFormData(null);
	};

	if (!fieldData) return <Spinner />;

	return (
		<Wrapper>
			<Back to='/fields'>
				<FontAwesomeIcon icon={faArrowLeft} />
				<p>Back to search</p>
			</Back>

			{fieldData && (postData || isPostDataEmpty) ? (
				<Content>
					<Hero
						heroImg={fieldData.defaultImg}
						name={fieldData.name}
						address={fieldData.address}
					/>

					<MenuBar openMaps={openMaps} toggleForm={toggleForm} />

					<Posts>
						{isPostDataEmpty ? (
							<p>No posts here yet!</p>
						) : (
							Object.entries(postData).map(([postId, data], index) => (
								<Post
									key={index}
									postId={postId}
									body={data.body}
									postDate={data.postDate}
									visitDate={data.visitDate}
									userId={data.userId}
									conditions={data.conditions}
									occupancy={data.occupancy}
									editPost={() => handleEdit({ ...data, postId })}
								/>
							))
						)}
					</Posts>

					{isFormVisible && (
						<PostForm
							toggleVisibility={toggleFormVisibility}
							formData={formData}
							fieldName={fieldData.name}
						/>
					)}
				</Content>
			) : (
				<p>Loading...</p>
			)}
		</Wrapper>
	);
};

export default Field;
