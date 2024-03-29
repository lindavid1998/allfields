import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getUserFullName } from '../firebase';
import { db, auth, getUserId, storage } from '../firebase';
import { ref, remove, get } from 'firebase/database';
import { getDownloadURL, ref as sRef, listAll, deleteObject, refFromURL } from 'firebase/storage';
import { capitalize } from '../utils/utils';
import PostIcons from './PostIcons';
import PostHeader from './PostHeader';
import ImageViewer from '../pages/Field/ImageViewer';
import './Post.css'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid var(--light-text-color);
	padding: 20px 0;
	position: relative;
	color: var(--main-text-color);
	height: fit-content;
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
	width: fit-content;
	flex-wrap: wrap;
`

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover; 
	vertical-align: middle;
	border-radius: 5px;
`

const Images = ({ urls, toggleView, showDelete, deleteImg }) => {
	return (
			<ImagesContainer>
					{urls.map((url, index) => (
							<ImageDiv className={showDelete ? 'img-container show-delete' : 'img-container'} key={index} onClick={toggleView}>
								<Image src={url} />
								
								{showDelete && (
									<div className='delete-photo'>
										<p className='small' onClick={(e) => { e.stopPropagation(); deleteImg(url); }}>Remove</p>
									</div>
								)}
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
	showIcons = true,
	header = 'name',
	fieldId,
}) => {
	const [name, setName] = useState('');
	const [field, setField] = useState('');
	const [isAuthorizedUser, setIsAuthorizedUser] = useState(false);
	const [imageUrls, setImageUrls] = useState([])
	const [showImageViewer, setShowImageViewer] = useState(false)

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

					if (result.items.length == 0) return
						
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

		fetchImages()
	
		let currentUserId = getUserId(auth);
		setIsAuthorizedUser(currentUserId === userId);
		
	}, [header, userId, fieldId, postId]);

	const deletePost = async (postId) => {
		try {
			const confirmed = window.confirm('Are you sure you want to delete?');
			if (confirmed) {
				await remove(ref(db, `posts/${postId}`)); 

				// Delete any images uploaded with post
				const storageRef = sRef(storage, `images/user-images/${postId}`)
				const result = await listAll(storageRef);
				const promises = result.items.map(async (item) => {
					await deleteObject(item)
				})
				await Promise.all(promises)
			}
		} catch (err) {
			console.log(err);
		}
	};

	const deleteImage = async (url) => {
		// remove image from view
    const updatedUrls = imageUrls.filter((imageUrl) => imageUrl !== url);
    setImageUrls(updatedUrls);

		// remove from fb storage
		const ref = sRef(storage, url)
		await deleteObject(ref)
	}

	const convertConditionsToString = (conditions) => {
		let entries = Object.entries(conditions); // convert conditions object to an array of key-value pairs
		let filteredEntries = entries.filter(([key, value]) => value); // only keep pairs that have value of true
		let arr = filteredEntries.map((subArr) => capitalize(subArr[0])); // map filtered keys to an array

		if (arr.length == 0) return ''

		return arr.join(', '); // join array by comma, capitalizing each word
	};

	const toggleViewer = () => {
		setShowImageViewer(prevState => !prevState);
	}
	
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
			
			{imageUrls.length > 0 && <Images urls={imageUrls} toggleView={toggleViewer} showDelete={isAuthorizedUser} deleteImg={deleteImage} />}

			{showImageViewer && <ImageViewer id='test'  urls={imageUrls} toggleView={toggleViewer} />}
		</Wrapper>
	);
};

export default Post;
