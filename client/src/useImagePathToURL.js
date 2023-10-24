import { useEffect, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from './firebase';

export const useImagePathToURL = (imgPath) => {
  // custom hook that converts image path to URL
	const [imgURL, setImgURL] = useState(null);

	useEffect(() => {
		const fetchURL = async () => {
			try {
				const pathRef = ref(storage, imgPath);
				const URL = await getDownloadURL(pathRef);
				setImgURL(URL);
			} catch (error) {
				console.log(error);
			}
		};
		fetchURL();
	}, []);

	return imgURL;
};
