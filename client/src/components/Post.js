import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getUserFullName } from '../firebase';
import { db, auth, getUserId, storage } from '../firebase';
import { ref, remove, get } from 'firebase/database';
import { getDownloadURL, ref as sRef, listAll } from 'firebase/storage';
import { capitalize } from '../utils/utils';
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

const ImageDiv = styled.div`
	height: 132px;
	width: 174px;
`

const ImagesContainer = styled.div`
	display: flex;
	gap: 10px;
	margin-top: 10px;
`

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover; 
	vertical-align: middle;
	border-radius: 5px;
`

const Images = ({ urls }) => {
	return (
			<ImagesContainer>
					{urls.map((url, index) => (
							<ImageDiv key={index}>
								<Image src={url} />
							</ImageDiv>
					))}
			</ImagesContainer>
	);
};


const Post = ({
	body,
	postDate,
	visitDate,
	userId,
	postId,
	conditions,
	occupancy,
	editPost,
	imagesAdded,
	showIcons = true,
	header = 'name',
	fieldId,
}) => {
	const [name, setName] = useState('');
	const [field, setField] = useState('');
	const [isAuthorizedUser, setIsAuthorizedUser] = useState(false);
	const [imageUrls, setImageUrls] = useState([])

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

		const fetchImages = async () => {
			const ref = sRef(storage, `images/user-images/${postId}`);
			let urls = [];
	
			try {
					// get all image references under parent folder
					// references can be accessed using result.items
					const result = await listAll(ref);

					// get an array of promises 
					// each promise fetches the url of the image
					const promises = result.items.map(async (itemRef) => {
							const url = await getDownloadURL(itemRef); //  get image url
							urls.push(url);  // add to urls array
					});

					// wait for all promises to resolve (all urls fetched)
					await Promise.all(promises);
	
					setImageUrls(urls);
			} catch (error) {
					console.log(error);
			}
		};
	

		if (header === 'name') {
			fetchName();
		} else {
			fetchFieldName();
		}

		imagesAdded && fetchImages()
	
		let currentUserId = getUserId(auth);
		setIsAuthorizedUser(currentUserId === userId);
	}, [header, userId, fieldId, postId, imagesAdded]);

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
			{isAuthorizedUser && showIcons && (
				<PostIcons
					postId={postId}
					editPost={editPost}
					deletePost={deletePost}
				/>
			)}

			<PostHeader
				header={header}
				fieldId={fieldId}
				userId={userId}
				field={field}
				name={name}
				postDate={postDate}
			/>

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

			{occupancy && (
				<p>
					<strong>Occupancy:</strong> {capitalize(occupancy)}
				</p>
			)}
			
			{imagesAdded && <Images urls={imageUrls}></Images>}
		</Wrapper>
	);
};

export default Post;
