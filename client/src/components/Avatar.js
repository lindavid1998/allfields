import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase';
import './Avatar.css';

const Avatar = ({ onClick, className, userId, showEdit }) => {
	const [url, setUrl] = useState(null);

	useEffect(() => {
		const fetchImageURL = async () => {
			try {
				const pathRef = ref(storage, `images/avatars/${userId}.png`);
				const url = await getDownloadURL(pathRef);
				setUrl(url);
			} catch (error) {
				// Handle the case where the file is not found
				if (error.code === 'storage/object-not-found') {
					const defaultPathRef = ref(storage, 'images/avatars/default.png');
					setUrl(await getDownloadURL(defaultPathRef));
				} else {
					console.error('An error occurred:', error);
				}
			}
		};

		fetchImageURL();
	}, [userId]);

	return (
		<div
			onClick={onClick}
			className={className ? `avatar ${className}` : 'avatar'}
		>
			<img className='avatar-img' src={url} alt={`User ${userId}`} />

			{showEdit && (
				<div className='change-avatar'>
					<p className='small'>Change photo</p>
				</div>
			)}
		</div>
	);
};

export default Avatar;
