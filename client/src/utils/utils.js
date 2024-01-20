import { useEffect, useState, createContext } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase';

export const PathContext = createContext()

export const useImagePathToURL = (path) => {
	// custom hook that converts image path to URL
	const [url, setUrl] = useState(null);

	useEffect(() => {
		const fetchURL = async () => {
			try {
				const pathRef = ref(storage, path);
				setUrl(await getDownloadURL(pathRef));
			} catch (error) {
				console.log(error);
			}
		};
		fetchURL();
	}, [path]);

	return url;
};

export function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
