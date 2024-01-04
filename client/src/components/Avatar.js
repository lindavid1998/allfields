import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Div = styled.div`
	border-radius: 50%;
	background-image: url(${(props) => props.$url});
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	// flex-direction: column;
	// align-items: flex-end;
	z-index: 999;
`;

const Avatar = ({ onClick, className, userId, children }) => {
	const [url, setUrl] = useState(null);

	useEffect(() => {
		const fetchURL = async () => {
			try {
				const pathRef = ref(storage, `images/avatars/${userId}.png`);
				const url = await getDownloadURL(pathRef);
				setUrl(url);
			} catch (error) {
				if (error.code === 'storage/object-not-found') {
					// Handle the case where the file is not found
					const defaultPathRef = ref(storage, 'images/avatars/default.png');
					setUrl(await getDownloadURL(defaultPathRef));
					console.log('File not found. Using default image.');
				} else {
					console.error('An error occurred:', error);
				}
			}
		};

		fetchURL();
	}, [userId]);

	return (
		<Div
			$url={url}
			onClick={onClick}
			className={className ? `avatar ${className}` : 'avatar'}
		>
			{children}
		</Div>
		// <>
		// 	<Div
		// 		$url={url}
		// 		onClick={onClick}
		// 		className={className ? `avatar ${className}` : 'avatar'}
		// 	></Div>
		// 	<FontAwesomeIcon icon={faPen} style={{ color: 'white' }} />
		// </>
	);
};

export default Avatar;
